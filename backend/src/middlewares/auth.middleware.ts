import asyncHandler from "../utils/asyncHandler.js";
import  jwt from "jsonwebtoken";
import ApiError from '../utils/ApiError.js'
import env from '../constant/env.js'
import { prisma } from "../prisma.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{

  try{
    const token=req.header("Authorization")?.replace("Bearer ","")

    if(!token){
      throw new ApiError(401,"Invalid accessToken")
    }

    const decodedToken=jwt.verify(token,env.ACCESS_TOKEN_SECRET) as AccessTokenPayload

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
      throw new ApiError(401,"Invalid access token")
    }

    req.user=user

    next()
  }catch(error){
    next(error)
  }
})