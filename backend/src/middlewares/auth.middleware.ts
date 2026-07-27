import asyncHandler from "../utils/asyncHandler.js"
import ApiError from '../utils/ApiError.js'
import { prisma } from "../prisma.js";
import { verifyToken } from "@clerk/express";


export const verifyJWT=asyncHandler(async(req,res,next)=>{

  try{
    // console.log("getting through verifyJWT...")
  
     const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token){
      throw new ApiError(401,"Invalid accessToken")
    }

    //logs
    // console.log("auth-middleware-log:...")

    // console.log("token:",token)

    
    const payload=await verifyToken(token,{
        secretKey:process.env.CLERK_SECRET_KEY,
    })

    // console.log("now check payload:",payload)

    const clerkUserId=payload.sub;

    // console.log("Does the clerkUserId is there:",clerkUserId)

    const user=await prisma.user.findUnique({
      where:{
        clerkId:clerkUserId
      },
      select:{
        id:true,
        name:true,
        email:true,
        avatar:true
      }
    })

    // console.log("User exist?????:", user)

    if(!user){
      throw new ApiError(401,"Invalid access token")
    }

    req.user=user

    next()
  }catch(error:any){
    // console.log("backend auth error authMiddleware:", error.message)
    next(error)

  }
})