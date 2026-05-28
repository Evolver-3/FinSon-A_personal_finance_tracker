import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {prisma} from '../prisma.js'
import bcrypt from 'bcrypt'
import { generateAccessAndRefreshTokens } from "../utils/generateToken.js";
import crypto from 'crypto'
import { verificationEmailService } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'
import env from '../constant/env.js'


//register controller

export const registerUser=asyncHandler(async(req,res)=>{

  const {name,email,password}=req.body

  if(!name || !email || !password){
    throw new ApiError(400,"All fields are required")
  }

  const isValidEmail=(email:string)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  if(!isValidEmail(email)){
    throw new ApiError(400,"Invalid email format")
  }

  const existingUser=await prisma.user.findUnique({
    where:{email}
  })

  if(existingUser){
    throw new ApiError(409,"User already esixt")
  }

  const hashedPassword=await bcrypt.hash(password,10)

  const verificationToken=crypto.randomBytes(32).toString("hex")
  const verificationExp=new Date(Date.now()+15*60*1000)

  const user=await prisma.user.create({
    data:{
      name,email,password:hashedPassword,emailVerified:false,
      emailVerificationToken:verificationToken,
      emailVerificationExp:verificationExp
    },
    select:{
      id:true,
      name:true,
      email:true,
      avatar:true,
      role:true,
      emailVerified:true,
      createdAt:true,
      updatedAt:true,
    }
    })

    await verificationEmailService(email,verificationToken)

    return res.status(201).json(new ApiResponse(201,user,"User created Successfully"))

})

//login controller

export const loginUser=asyncHandler(async(req,res)=>
{
  
  const {email,password}=req.body

  if(!email || !password){
    throw new ApiError(400,"fields are empty")
  }

  const user=await prisma.user.findUnique({
    where:{email}
  })

  if(!user){
    throw new ApiError(401,"Invalid credentials")
  }

  const isPassword=await bcrypt.compare(password,user.password)

  if(!isPassword){
    throw new ApiError(401,"Invalid credentials")
  }

  if(!user.emailVerified){
    throw new ApiError(401,"Invalid")
  }

  const {accessToken,refreshToken}=generateAccessAndRefreshTokens(user.id)

  await prisma.refreshToken.create({
    data:{
      token:refreshToken,
      userId:user.id,
      expiresIn:new Date(Date.now()+7 * 24 * 60* 60* 1000)
    }
  })

  return res.status(200).json(new ApiResponse(200,{
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
      role:user.role
    },
    accessToken,
    refreshToken
  },"Login successfull !!"
))
})

//controller for getting verifying link of the user email

export const verifyEmail=asyncHandler(async(req,res)=>{
  const token =req.query.token as string

  if(!token){
    throw new ApiError(400,"Token is required")
  }

  const user=await prisma.user.findFirst({
    where:{
      emailVerificationToken:token,
      emailVerificationExp:{
        gt:new Date()
      }
    }
  })

  if(!user){
    throw new ApiError(400,"Invalid or expired verification token")
  }

  await prisma.user.update({
    where:{id:user.id},
    data:{
      emailVerified:true,
      emailVerificationToken:null,
      emailVerificationExp:null
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"Email verified, now you can Sign In"))
})

//controller for verifying the email link

export const resendVerificationEmail=asyncHandler(async(req,res)=>{

  const {email}=req.body 

  if(!email){
    throw new ApiError(400,"Email is required")
  }

  const user=await prisma.user.findUnique({
    where:{email}
  })

  if(!user){
    throw new ApiError(404,"User not found")
  }

  if(user.emailVerified){
    throw new ApiError(400,"Email is already verified")
  }

  const verificationToken=crypto.randomBytes(32).toString("hex")
  const verificationExp=new Date(Date.now()+15*60*1000)

  await prisma.user.update({
    where:{id:user.id},
    data:{
      emailVerificationToken:verificationToken,
      emailVerificationExp:verificationExp
    }
  })

  await verificationEmailService(user.email,verificationToken)

  return res.status(200).json(new ApiResponse(200,null,"Verification email send successfully"))


})

//user logged out controllers

export const logoutUser=asyncHandler(async(req,res)=>{
  const {refreshToken}=req.body

  if(!refreshToken){
    throw new ApiError(400,"Refresh Token is required")
  }

  await prisma.refreshToken.deleteMany({
    where:{
      token:refreshToken
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"logout successfully"))

})

//logged out user from all devices

export const AllLogout=asyncHandler(async(req,res)=>{
  
  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"Unauthorized userid")
  }

  await prisma.refreshToken.deleteMany({
    where:{
      userId
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"Logged out from all devices"))
})

//controller for refresh accesstoken with the help of refresh token 

export const refreshAccessToken=asyncHandler(async(req,res)=>{

  const {refreshToken:incomingRefreshToken}=req.body

  if(!incomingRefreshToken){
    throw new ApiError(400,"Refresh token is required")
  }

  try{
    const decodedToken=jwt.verify(incomingRefreshToken,env.REFRESH_TOKEN_SECRET) as TokenPayload

    if(!decodedToken){
      throw new ApiError(401,"Invalid refresh Token")
    }

    const user=await prisma.user.findUnique({
      where:{
        id:decodedToken?.id
      },
      select:{
        id:true,
        name:true,
        email:true,
        avatar:true,
        role:true
      }
    })

    if(!user){
      throw new ApiError(401,"Invalid refresh token")
    }

    const storedRefreshToken=await prisma.refreshToken.findUnique({
      where:{
        token:incomingRefreshToken
      }
    })

    if(!storedRefreshToken){
      throw new ApiError(401,"Refresh token not found")
    }

    if(storedRefreshToken.expiresIn< new Date()){
      await prisma.refreshToken.delete({
        where:{
          id:storedRefreshToken.id
        }
      })

      throw new ApiError(401,"Refresh token expired")
    }

    const {accessToken,refreshToken}=generateAccessAndRefreshTokens(user.id)

    await prisma.refreshToken.delete({
      where:{
        id:storedRefreshToken.id
      }
    })

    await prisma.refreshToken.create({
      data:{
        token:refreshToken,
        userId:user.id,
        expiresIn:new Date(Date.now()+ 7*24*60*60*1000)
      }
    })

    return res.status(200).json(new ApiResponse(200,{
      user,accessToken,refreshToken
    },"Access token refreshed successfully "))

 
  }catch(error:any){
    throw new ApiError(401,error.message)
  }

})

//changing the user password

export const changePassword=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(400,"User id doesn't exist")
  }

   const {currentPassword,newPassword,confirmNewPassword}=req.body

   if((!currentPassword)||(!newPassword)||(!confirmNewPassword)){
    throw new ApiError(400,"currentpassword and new password is required")
   }

   if(newPassword===currentPassword){
    throw new ApiError(400,"new password must be diffferent from the current Password")
   }

   if(newPassword!==confirmNewPassword){
    throw new ApiError(400,"newpassword and confirmation password doesn't match")
   }

  const user=await prisma.user.findUnique({
    where:{
      id:userId
    }
  })

  if(!user){
    throw new ApiError(404,"user not found")
  }
  const isPasswordCorrect=await bcrypt.compare(currentPassword,user?.password)

  if(!isPasswordCorrect){
    throw new ApiError(401,"current password is incorrect")
  }

  const hashedNewPassword=await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where:{
      id:userId
    },
    data:{
      password:hashedNewPassword
    }
  })

   return res.status(200).json(new ApiResponse(200,null,"Password changed successfully "))

})

//forgot password--sends the link to the user email

export const forgotPassword=asyncHandler(async(req,res)=>{

  const {email}=req.body

  if(!email){
    throw new ApiError(400,"Email is required")
  }

  const user=await prisma.user.findFirst({
    where:{
      email
    }
  })

  if(!user){
    throw new ApiError(400,"Invalid email given")
  }

  const resetToken=crypto.randomBytes(32).toString("hex")
  const resetExp=new Date(Date.now()+15*60*1000)

   await prisma.user.update({
    where:{id:user.id},
    data:{
      passwordResetToken:resetToken,
      passwordResetExp:resetExp
    }
  })

  await verificationEmailService(user.email,resetToken)

  return res.status(200).json(new ApiResponse(200,null,"Verification link sended on email successfully"))
})

//reset the password after getting the link

export const resetPassword=asyncHandler(async(req,res)=>{

  const token=req.query.token as string

  if(!token){
    throw new ApiError(400,"unauthorized user")
  }

  const user=await prisma.user.findFirst({
    where:{
      passwordResetToken:token,
      passwordResetExp:{
        gt:new Date()
      }}
    })

  if(!user){
    throw new ApiError(400,"Invalid or expired token")
  }

  const {newPassword,confirmNewPassword}=req.body

  if(!newPassword||!confirmNewPassword){
    throw new ApiError(400,"fields should not be empty")
  }

  if(newPassword!==confirmNewPassword){
    throw new ApiError(400,"both password should be equal")
  }

  const checkNewPassword=await bcrypt.compare(newPassword,user.password)

  if(checkNewPassword){
    throw new ApiError(400,"new password is same as previous password")
  }

  const hashedNewPassword=await bcrypt.hash(newPassword, 10)

   await prisma.user.update({
    where:{
      id:user.id
    },
    data:{
      password:hashedNewPassword,
      passwordResetExp:null,
      passwordResetToken:null
    }
  })

  await prisma.refreshToken.deleteMany({
    where:{
      userId:user.id
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"Password reset successfully"))
})

//getting user profile 
export const getUserProfile=asyncHandler(async(req,res)=>{ 

  if(!req.user){
    throw new ApiError(401,"Unauthorised")
  }

  return res.status(200).json(new ApiResponse(200,req.user,"User profile fetched "))

})