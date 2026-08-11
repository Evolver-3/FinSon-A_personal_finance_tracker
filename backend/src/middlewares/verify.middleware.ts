
import { verifyToken } from "@clerk/express";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyClerk=asyncHandler(async(req,res,next)=>{

  try{

    console.log("i am on the verify clerk middleware")
  const token=req.headers.authorization?.replace("Bearer ", "")

  if(!token){
    throw new ApiError(401,"missing token")
  }

  const payload=await verifyToken(token,{
    secretKey:process.env.CLERK_SECRET_KEY,
  })

  console.log("Does payload exist??", !!payload)

  req.clerkUserId=payload.sub

  next()

  }catch(error:any){
    next(error)

  }
})