import { prisma } from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createAccount=asyncHandler(async(req,res)=>{

  const userId=req.user?.id 

  if(!userId){
    throw new ApiError(400,"unauthorized user")
  }

  const {name,type,balance}=req.body

  if(!name||!type){
    throw new ApiError(400,"Fields are empty")
  }

  const account=await prisma.account.create({
    data:{
      name,
      type,
      balance:balance??0,
      userId
    }
  })
  if(!account){
    throw new ApiError(400,"Some error occurred during creating account")
  }

  return res.status(201).json(new ApiResponse(201,account,"Account created successfully"))
})

export const getAccount=asyncHandler(async(req,res)=>{
  const userId=req.user?.id

   if(!userId){
    throw new ApiError(400,"authorization not provided")
  }

  const accounts=await prisma.account.findMany({
    where:{
      userId
    },
    select:{
      id:true,
      name:true,
      type:true,
      balance:true,
      createdAt:true,
      updatedAt:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return res.status(200).json(new ApiResponse(200,accounts,"Account fetched successfully"))

})

export const updateAccount=asyncHandler(async(req,res)=>{
  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"Unauthorized")
  }
  const {accountId}=req.params

  if(!accountId || Array.isArray(accountId)){
    throw new ApiError(400,"account doesn't exist")
  }
  const {name,type,balance}=req.body

  if(!name && !type && balance===undefined){
    throw new ApiError(400,"At least one fields is required")
  }

  const existingAccount=await prisma.account.findFirst({
    where:{
      id:accountId,
      userId,
    },
  })

  if(!existingAccount){
    throw new ApiError(400,"Account not found")
  }

  const account =await prisma.account.update({
    where:{
      id:existingAccount.id
    },
    data:{
      ...(name && {name}),
      ...(type && {type}),
      ...(balance !== undefined && {balance})
    },
    select:{
      id:true,
      name:true,
      type:true,
      balance:true,
      createdAt:true,
      updatedAt:true,
    }
  })

  return res.status(200).json(new ApiResponse(200,account,"account updated"))
})

export const deleteAccount=asyncHandler(async(req,res)=>{

  const userId=req.user?.id 
  if(!userId){
    throw new ApiError(400,"Unauthorized")
  }

  const {accountId}=req.params

  if(!accountId || Array.isArray(accountId)){
    throw new ApiError(400,"account id is required")
  }

  const existingAccount=await prisma.account.findFirst({
    where:{
      id:accountId,
      userId
    }
  })

  if(!existingAccount){
    throw new ApiError(404,"account not found")
  }

  await prisma.account.delete({
    where:{
      id:existingAccount.id
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"Account deleted successfully"))

})