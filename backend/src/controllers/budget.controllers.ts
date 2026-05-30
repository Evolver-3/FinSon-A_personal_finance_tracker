import { prisma } from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


//create a new Budget
export const createBudget=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const {amount,month,year,categoryId}=req.body

  if(!amount || !month || !year || !categoryId){
    throw new ApiError(400,"All fields are required")
  }

  const category=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  if(!category){
    throw new ApiError(400,"Category not found")
  }

  const existingBudget=await prisma.budget.findFirst({
    where:{
      userId,
      categoryId,
      month,
      year
    }
  })

  if(existingBudget){
    throw new ApiError(409,"budget already exist for this category and month")
  }
  const budget=await prisma.budget.create({
    data:{
      amount,
      month,
      year,
      user:{
        connect:{
          id:userId
        }
      },
      category:{
        connect:{
          id:categoryId
        }
      }
    },
    select:{
      id:true,
      amount:true,
      month:true,
      year:true,
      category:true,
      createdAt:true,
      updatedAt:true
    }
  })

  return res.status(201).json(new ApiResponse(201,budget,"budget created successfully"))


})

//get all budgets
export const getBudget=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const budget=await prisma.budget.findMany({
    where:{
      userId
    },
    select:{
      id:true,
      amount:true,
      month:true,
      year:true,
      category:{
        select:{
          id:true,
          name:true,
          color:true,
          icon:true,
          type:true,
        }
      },
      createdAt:true,
      updatedAt:true
    },
    orderBy:{
      updatedAt:"desc"
    }
  })

  return res.status(200).json(new ApiResponse(200,budget,"All Budgets"))

})

//get a single budgets by the budgetId
export const getBudgetById=asyncHandler(async(req,res)=>{
  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const {budgetId}=req.params

  if(!budgetId  || Array.isArray(budgetId)){
    throw new ApiError(400,"Budget id is required")
  }

  const budget=await prisma.budget.findFirst({
    where:{
      id:budgetId,
      userId
    },
    select:{
      id:true,
      amount:true,
      month:true,
      year:true,
      category:{
        select:{
          id:true,
          name:true,
          color:true,
          icon:true,
          type:true,
        }
      },
      createdAt:true,
      updatedAt:true
    },
  })

  if(!budget){
    throw new ApiError(400,"budget not found")
  }

  return res.status(200).json(new ApiResponse(200,budget,"budget by id"))

})

//update a single budget by it's id
export const updateBudgetById=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const {budgetId}=req.params

  if(!budgetId  || Array.isArray(budgetId)){
    throw new ApiError(400,"Budget id is required")
  }

  const {amount,month,year,categoryId}=req.body

  if(amount===undefined && !month && !year && !categoryId){
    throw new ApiError(400,"At least one field is required")
  }

  const existingBudget=await prisma.budget.findFirst({
    where:{
      id:budgetId,
      userId
    }
  })

  if(!existingBudget){
    throw new ApiError(400,"budget not found")
  }

  if(categoryId){
    const category=await prisma.category.findFirst({
      where:{
        id:categoryId,
        userId
      }
    })

    if(!category){
      throw new ApiError(400,"Category not found")
    }
  }

  const budget=await prisma.budget.update({
    where:{
      id:existingBudget.id
    },
    data:{
      ...(amount !== undefined && {amount}),
      ...(year !==undefined && {year}),
      ...(month !==undefined && {month}),
      ...(categoryId && {
        category:{
          connect:{
            id:categoryId
          }
        }
      })
    },
    select:{
      id:true,
      amount:true,
      year:true,
      month:true,
      category:{
        select:{
          id:true,
          name:true,
          color:true,
          icon:true
        }
      },
      createdAt:true,
      updatedAt:true
    }
  })

  return res.status(200).json(new ApiResponse(200,budget,"budget updated"))
})

//delete a budget by it's id
export const deleteBudgetById=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(401,"authorization failed")
  }

  const {budgetId}=req.params

  if(!budgetId || Array.isArray(budgetId)){
    throw new ApiError(400,"Budget id is required")
  }

  const existingBudget=await prisma.budget.findFirst({
    where:{
      id:budgetId,
      userId
    }
  })

  if(!existingBudget){
    throw new ApiError(400,"budget didn't exist")
  }

  await prisma.budget.delete({
    where:{
      id:existingBudget.id
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"budget deleted"))
})