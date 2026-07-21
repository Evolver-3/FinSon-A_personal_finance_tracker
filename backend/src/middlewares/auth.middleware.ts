import asyncHandler from "../utils/asyncHandler.js";
import  jwt from "jsonwebtoken";
import ApiError from '../utils/ApiError.js'
import env from '../constant/env.js'
import { prisma } from "../prisma.js";

export const verifyJWT=asyncHandler(async(req,res,next)=>{

  try{
    // const token=req.header("Authorization")?.replace("Bearer ","")

     const token = req.headers.authorization?.replace('Bearer ','');

    if(!token){
      throw new ApiError(401,"Invalid accessToken")
    }

    let decodedToken:AccessTokenPayload
    try{
      
      decodedToken=jwt.verify(token,env.ACCESS_TOKEN_SECRET) as AccessTokenPayload

    }catch(jwtError:any){
      
      if(jwtError.name==="TokenExpiredError"){
        throw new ApiError(401,"Access Token expired")
      }
      throw new ApiError(401,"Invalid access token")

    }

    const user=await prisma.user.findUnique({
      where:{
        id:decodedToken?.id
      },
      select:{
        id:true,
        name:true,
        email:true,
        avatar:true
      }
    })

    if(!user){
      throw new ApiError(401,"Invalid access token")
    }

    req.user=user

    next()
  }catch(error:any){
    console.log("backend auth error:", error.response?.data)
    next(error)

  }
})