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

  console.log("Backend checkpoint for posted data:", amount,month,year,categoryId)

  const category=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  console.log("backend checkpoint:",category)

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


export const getBudgetValues=asyncHandler(async(req,res)=>{

  const userId=req.user?.id 
  const {month,year}=req.query

  if(!userId){
    throw new ApiError(401,"A uthorization failed")
  }

  const budgetFind=await prisma.budget.findMany({
    where:{userId},
    include:{
      category:true
    }
  })

  if(budgetFind.length===0){
    throw new ApiError(401,"No budget exist")
  }

  const budgetsValues=await Promise.all(
    budgetFind.map(async(budget)=>{
      const spent=await prisma.transaction.aggregate({
        where:{
          userId,
          categoryId:budget.categoryId,
          type:"EXPENSE",
          date:{
            gte:new Date(Number(year), Number(month)-1, 1),
            lte:new Date(Number(year), Number(month), 1)
          }
        },
        _sum:{amount:true}
      })

      return {
        ...budget,
        spent:spent._sum?.amount??0,
        remaining:Number(budget.amount)-Number(spent._sum?.amount ?? 0)
      }
    })
  )

  return res.status(200).json(new ApiResponse(200,budgetsValues,"Budgets fetched"))
})