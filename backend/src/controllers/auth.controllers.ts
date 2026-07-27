import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {prisma} from '../prisma.js'
import {clerkClient} from '@clerk/clerk-sdk-node'


export const syncUserController=asyncHandler(async(req,res)=>{

  console.log("sync controller hit:....")
  console.log("req.user:", req.clerkUserId)

  const clerkUserId=req.clerkUserId

  if(!clerkUserId){
    throw new ApiError(401, "Unauthorized")
  }

  const clerkUser=await clerkClient.users.getUser(clerkUserId)

  console.log("clerkUser:",clerkUser)

  const user=await prisma.user.upsert({
    where:{
      clerkId:clerkUserId
    },
    update:{
      name:`${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[0]?.emailAddress! ,
      avatar: clerkUser.imageUrl
    },
    create:{
      clerkId: clerkUserId,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[0]?.emailAddress!,
      avatar: clerkUser.imageUrl,
      // Set defaults for required fields
      googleId: null,
    }
  })

  console.log("User synced successfully:",user)

  return res.status(200).json(new ApiResponse(200, user,"User synced successfully"))
})


export const userController=asyncHandler(async(req,res)=>{

  if(!req.user){
    throw new ApiError(400, "user doesn't exist")
  }

  console.log("controller res:",req.user)

  return res.status(201).json(new ApiResponse(
    200,
    {
      user:req.user
  },"Login successfully"
    
  ))
})


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



