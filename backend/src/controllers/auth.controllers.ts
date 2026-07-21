import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {prisma} from '../prisma.js'
import { generateAccessAndRefreshTokens } from "../utils/generateToken.js";
import jwt from 'jsonwebtoken'
import env from '../constant/env.js'
import {OAuth2Client} from 'google-auth-library'


const googleClient=new OAuth2Client(
  process.env.GOOGLE_WEB_CLIENT_ID,
  process.env.GOOGLE_WEB_CLIENT_SECRET
)

const googleTokenClient=new OAuth2Client(
  process.env.GOOGLE_WEB_CLIENT_ID,
)

export const googleLoginWithCode=asyncHandler(async(req,res)=>{

   
    const {code, codeVerifier,redirectUri}=req.body

    if(!code || !codeVerifier || !redirectUri){
      throw new ApiError(400,"Code, codeVerifier and redirect Uri is required")
    }

    const {tokens}=await googleClient.getToken({
      code,
      codeVerifier,
      redirect_uri:redirectUri
    })

    const idToken=tokens.id_token

    if(!idToken){
      throw new ApiError(400,"Google ID token is required.") 
    }
 
    const ticket=await googleClient.verifyIdToken({
      idToken, 
      audience: process.env.GOOGLE_WEB_CLIENT_ID!
    })

    const googleUser=ticket.getPayload()

    if(!googleUser?.email || !googleUser.sub){
      throw new ApiError(401,"Invalid Google token.")
    }

    if (!googleUser.email_verified) {
    throw new ApiError(403, "Please verify your Google email first.");
  }

    let user=await prisma.user.findFirst({
      where:{
        OR:[
          {googleId:googleUser.sub},
          {email:googleUser.email}
        ]
      }
    })

    if(!user){
      user=await prisma.user.create({
        data:{
          googleId:googleUser.sub,
          name:googleUser.name || googleUser.given_name||"User", 
          email:googleUser.email,
          avatar:googleUser.picture || null,

        }
      })
    }else if(!user.googleId){
      user=await prisma.user.update({
        where:{id:user.id},
        data:{
          googleId:googleUser.sub,
          avatar:user.avatar || googleUser.picture || null
        }
      })
    }

    const {accessToken,refreshToken}= generateAccessAndRefreshTokens(user.id)

  await prisma.refreshToken.create({
    data:{
      token:refreshToken,
      userId:user.id,
      expiresAt:new Date(Date.now()+7 * 24 * 60* 60* 1000)
    }
  })


  return res.status(200).json(
    new ApiResponse(200,{
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
    },
    accessToken,
    refreshToken
  },"Login successfull !!")) 

})

export const googleLogin=asyncHandler(async(req,res)=>{

  const {idToken}=req.body

  
    if(!idToken){
      throw new ApiError(400,"Google ID token is required.") 
    }
 
    const ticket=await googleTokenClient.verifyIdToken({
      idToken, 
      audience:  [
    process.env.GOOGLE_WEB_CLIENT_ID!,
    process.env.GOOGLE_ANDROID_CLIENT_ID!]
    })

    const googleUser=ticket.getPayload()

    if(!googleUser?.email || !googleUser.sub){
      throw new ApiError(401,"Invalid Google token.")
    }

    if (!googleUser.email_verified) {
    throw new ApiError(403, "Please verify your Google email first.");
  }

    let user=await prisma.user.findFirst({
      where:{
        OR:[
          {googleId:googleUser.sub},
          {email:googleUser.email}
        ]
      }
    })

    if(!user){
      user=await prisma.user.create({
        data:{
          googleId:googleUser.sub,
          name:googleUser.name || googleUser.given_name||"User", 
          email:googleUser.email,
          avatar:googleUser.picture || null,

        }
      })
    }else if(!user.googleId){
      user=await prisma.user.update({
        where:{id:user.id},
        data:{
          googleId:googleUser.sub,
          avatar:user.avatar || googleUser.picture || null
        }
      })
    }

    const {accessToken,refreshToken}= generateAccessAndRefreshTokens(user.id)

  await prisma.refreshToken.create({
    data:{
      token:refreshToken,
      userId:user.id,
      expiresAt:new Date(Date.now()+7 * 24 * 60* 60* 1000)
    }
  })


  return res.status(200).json(
    new ApiResponse(200,{
    user:{
      id:user.id,
      name:user.name,
      email:user.email,
      avatar:user.avatar,
    },
    accessToken,
    refreshToken
  },"Login successfull !!")) 

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
        id:decodedToken.id
      },
      select:{
        id:true,
        name:true,
        email:true,
        avatar:true
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

    if(!storedRefreshToken || storedRefreshToken.userId !==user.id){
      throw new ApiError(401,"Refresh token not found")
    }

    if(storedRefreshToken.expiresAt< new Date()){
      await prisma.refreshToken.delete({
        where:{
          id:storedRefreshToken.id
        }
      })

      throw new ApiError(401,"Refresh token expired")
    }

    const {accessToken,refreshToken}=generateAccessAndRefreshTokens(user.id)

     await prisma.$transaction([
      prisma.refreshToken.delete({ where: { id: storedRefreshToken.id } }),
      prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    return res.status(200).json(new ApiResponse(200,{
      user,accessToken,refreshToken
    },"Access token refreshed successfully "))

 
  }catch(error:any){

    if(error instanceof ApiError){
      throw error;
    }
    throw new ApiError(401,error.message)
  }

})



