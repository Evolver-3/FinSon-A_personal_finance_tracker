
import { verifyToken } from "@clerk/express";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyClerk=asyncHandler(async(req,res,next)=>{

  try{
  const token=req.headers.authorization?.replace("Bearer ", "")

  if(!token){
    throw new ApiError(401,"missing token")
  }

  const payload=await verifyToken(token,{
    secretKey:process.env.CLERK_SECRET_KEY,
  })

  req.clerkUserId=payload.sub

  next()

  }catch(error:any){
    // console.log("backend auth error:", error.message)
    next(error)

  }
})