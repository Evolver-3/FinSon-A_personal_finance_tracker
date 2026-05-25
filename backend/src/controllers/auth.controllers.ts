import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {prisma} from '../prisma.js'
import bcrypt from 'bcrypt'
import { generateAccessAndRefreshTokens } from "../utils/generateToken.js";


export const registerUser=asyncHandler(async(req,res)=>{

  const {name,email,password}=req.body

  if(!name || !email || !password){
    throw new ApiError(400,"All fields are required")
  }

  const existingUser=await prisma.user.findUnique({
    where:{email}
  })

  if(existingUser){
    throw new ApiError(409,"User already esixt")
  }

  const hashedPassword=await bcrypt.hash(password,10)

  const user=await prisma.user.create({
    data:{
      name,email,password:hashedPassword
    },
    select:{
      id:true,
      name:true,
      email:true,
      avatar:true,
      role:true,
      createdAt:true,
      updatedAt:true,
    }
    })

    res.status(201).json(new ApiResponse(201,user,"User created Successfully"))

})

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

  const {accessToken,refreshToken}=generateAccessAndRefreshTokens(user.id)

  // await prisma.refreshToken.create({
  //   data:{
  //     token:refreshToken,
  //     userId:user.id,
  //     expiresIn:new Date(Date.now()+7 * 24 * 60* 60* 1000)
  //   }
  // })

  res.status(200).json(new ApiResponse(200,{
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