import { prisma } from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createCategory=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const {name,color,icon,type}=req.body 

  if(!name || !type){
    throw new ApiError(400,"Fields empty")
  }

  const category=await prisma.category.create({
    data:{
      name,
      color,
      icon,
      type,
      userId
    }
  })

  if(!category){
    throw new ApiError(400,"some error occurred during creation of category")
  }

  return res.status(201).json(new ApiResponse(200,category,"Category created successfully"))
})

export const getAllCategory=asyncHandler(async (req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization not provided")
  }

  const category=await prisma.category.findMany({
    where:{
      userId
    },
    select:{
      name:true,
      color:true,
      icon:true,
      type:true,
      createdAt:true,
      updatedAt:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  if(!category){
    throw new ApiError(401,"user id doesn't exist")
  }

  return res.status(201).json(new ApiResponse(200,category,"all category available"))
})

export const getCategoryById=asyncHandler(async (req,res)=>{

  const userId=req.user?.id

  const {categoryId}=req.params

  if(!userId){
    throw new ApiError(401,"unauthorized user")
  }

  if(!categoryId ||Array.isArray(categoryId)){
    throw new ApiError(404,"category id not found")
  }

  const categoryExist=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  if(!categoryExist){
    throw new ApiError(400,"Catogory doesn't exist with given id")
  }

  return res.status(200).json(new ApiResponse(200,categoryExist,"category found"))

})

export const updateCategoryById=asyncHandler(async (req,res)=>{

  const userId=req.user?.id

  const {categoryId}=req.params

  if(!userId){
    throw new ApiError(401,"unauthorized user")
  }

  if(!categoryId ||Array.isArray(categoryId)){
    throw new ApiError(404,"No id found")
  }

  const {name,color,icon,type}=req.body

  if(!name && !color && !icon && !type){
    throw new ApiError(404,"Atleast one field is required")
  }

  const existCategory=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  if(!existCategory){
    throw new ApiError(400,"Category not found")
  }

  const category=await prisma.category.update({
    where:{
      id:existCategory.id
    },
    data:{
      ...(name && {name}),
      ...(color && {color}),
      ...(icon && {icon}),
      ...(type && {type})
    },
    select:{
      id:true,
      name:true,
      color:true,
      icon:true,
      type:true,
      createdAt:true,
      updatedAt:true
    }
  })

  if(!category){
    throw new ApiError(400,"Some error occurred during updation of a category")
  }

  return res.status(201).json(new ApiResponse(200,category,"category updated"))  

})

export const deleteById=asyncHandler(async (req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"Authorization failed")
  }

  const {categoryId}=req.params 

  if(!categoryId || Array.isArray(categoryId)){
    throw new ApiError(400,"id is required")
  }

  const existCategory=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  if(!existCategory){
    throw new ApiError(404,"account not found")
  }

  await prisma.category.delete({
    where:{
      id:existCategory.id
    }
  })
  
  return res.status(200).json(new ApiResponse(200,null,"category deleted"))
})