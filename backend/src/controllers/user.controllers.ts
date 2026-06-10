import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { prisma } from "../prisma.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

//getting user profile 
export const getUserProfile=asyncHandler(async(req,res)=>{ 

  if(!req.user){
    throw new ApiError(401,"Unauthorised")
  }
  console.log(req?.user)

  return res.status(200).json(new ApiResponse(200,req.user,"User profile fetched "))

})

export const updateProfile=asyncHandler(async(req,res)=>{

  if(!req.user){
    throw new ApiError(401,"Unauthorised")
  }

  const {name}=req.body

  if(!name){
    throw new ApiError(400,"name is required")
  }

  const user = await prisma.user.update({
  where: { id: req.user.id },
  data: {
    name,
  },
  select: {
    id: true,
    name: true,
    email: true,
    avatar: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  },
})
   return res.status(200).json(new ApiResponse(200,user,"username updated"))

})

export const uploadAvatar=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"Unauthorized")
  }
  const avatar=req?.file

  if(!avatar){
    throw new ApiError(400,"Avatar is required")
  }

  const uploadAvatar=await uploadToCloudinary(avatar.buffer)

  if(!uploadAvatar){
    throw new ApiError(500,"failed to upload image on cloudinary")
  }

  console.log(uploadAvatar)

  const user=await prisma.user.update({
    where:{id:userId},
    data:{avatar:uploadAvatar.url},
    select:{
      id:true,
      name:true,
      email:true,
      avatar:true,
      role:true,
      createdAt:true,
      updatedAt:true
    }
  }) 

  return res.status(200).json(new ApiResponse(200,user,"Avatar uploaded successfully"))
})

