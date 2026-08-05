import { prisma } from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



//create transaction controller
export const createTransaction=asyncHandler(async(req,res)=>{
  const userId=req.user?.id 

  if(!userId){
    throw new ApiError(401,"authorization error")
  }

  const {title,amount,type,note,date,accountId,categoryId}=req.body

  if(!title || !amount ||!type || !accountId|| !categoryId){
    throw new ApiError(400,"all fields are required")
  }

  const account=await prisma.account.findFirst({
    where:{
      id:accountId,
      userId
    }
  })

  if(!account){
    throw new ApiError(404,"Account not found")
  }

  const category=await prisma.category.findFirst({
    where:{
      id:categoryId,
      userId
    }
  })

  if(!category){
    throw new ApiError(404,"Category not found")
  }
 
  const transaction =await prisma.transaction.create({
    data:{
      title, 
      amount,
      type,
      ...(note && {note}),
      ...(date && {
        date:new Date(date)
      }),

      user:{
        connect:{
          id:userId
        }
      },
      account:{
        connect:{
          id:accountId
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
      title:true,
      amount:true,
      type:true,
      note:true,
      date:true,
      account:true,
      category:true,
      createdAt:true,
      updatedAt:true
    }
  })

  return res.status(201).json(new ApiResponse(201,transaction, "Transaction created successfully"))
})


//get a single transaction with its transactio id
export const getTransactionById=asyncHandler(async(req,res)=>{

    const userId=req.user?.id

  if(!userId){
     throw new ApiError(401,"authorization error")
  }

  const {transactionId}=req.params

  if(!transactionId|| Array.isArray(transactionId)){
    throw new ApiError(400,"id is required")
  }

  const transaction=await prisma.transaction.findFirst({
    where:{
      id:transactionId,
      userId
    },
    select:{
      id:true,
      title:true,
      amount:true,
      type:true,
      note:true,
      date:true,
      account:{
        select:{
          id:true,
          name:true,
          type:true,
          color:true,
          icon:true
        }
      },
      category:{
        select:{
          id:true,
          name:true,
          color:true,
          icon:true,
          type:true
        }
      },
      createdAt:true,
      updatedAt:true
    }
  })

  if(!transaction){
    throw new ApiError(404,"Transaction not found")
  }

  return res.status(200).json(new ApiResponse(200,transaction,"Transactions by id"))
  
})


//get by year

export const getTransactionByYear=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
    throw new ApiError(400,"Authorization error")
  }

  const year=Number(req.query.year)|| new Date().getFullYear()

  const now=new Date()

  const isCurrentYear=year===now.getFullYear()

  const lastMonth=isCurrentYear?now.getMonth()+1:12

  const start=new Date(year,0,1,0,0,0,0)
  const end=new Date(year,lastMonth,1,0,0,0,0)

  const transactionsdetails=await prisma.transaction.findMany({
    where:{
      userId,
      date:{
        gte:start,
        lt:end,
      }
    },
    include:{
      category:true,
      account:true
    },
    orderBy:{
      date:"asc"
    }
  })

  const monthly=Array.from({length:lastMonth},(_,index)=>({
    month:index+1,
    label:new Date(year, index,1).toLocaleString("en-US",{
      month:'short'
    }),
    income:0,
    expense:0,
    savings:0,
    count:0,
    transactions:[] as (typeof transactionsdetails)[number][]
  }))

  transactionsdetails.forEach((t)=>{
    const monthIndex=t.date.getMonth()
    const amount=Number(t.amount)

    if(!monthly[monthIndex]) return;

    monthly[monthIndex].transactions.push(t)

    if(t.type==="INCOME"){
      monthly[monthIndex].income+=amount
    }

    if(t.type==="EXPENSE"){
      monthly[monthIndex].expense+=amount
    }

    monthly[monthIndex].count+=1

  })

  const result=monthly.map((m)=>({
    ...m,savings:m.income-m.expense
  }))

  console.log(result)

  return res.status(200).json(
    new ApiResponse(200,{
      year,
      months:result
    },"Transactions fetched")
  )
})

//update a single transaction by id
  export const updateById=asyncHandler(async(req,res)=>{

  const userId=req.user?.id

  if(!userId){
     throw new ApiError(401,"authorization error")
  }

  const {transactionId}=req.params

  if(!transactionId|| Array.isArray(transactionId)){
    throw new ApiError(400,"Transaction id is required")
  }

  const {title,amount,type,note,date,accountId,categoryId}=req.body

  if(!title && amount===undefined && !type && note ===undefined && !date && !accountId && !categoryId){
    throw new ApiError(400,"At least one field is required")
  }

  const existingTransaction=await prisma.transaction.findFirst({
    where:{
      id:transactionId,
      userId
    }
  })

  if(!existingTransaction){
    throw new ApiError(404,"Transaction not found") 
  }

  if(accountId){
    const account=await prisma.account.findFirst({
      where:{
        id:accountId,
        userId
      }
    })

    if(!account){
      throw new ApiError(404,"Account not found")
    }
  }

  if(categoryId){
    const category=await prisma.category.findFirst({
      where:{
        id:categoryId,
        userId
      }
    })

    if(!category){
      throw new ApiError(404, "Category not found")
    }
  }

  const transaction =await prisma.transaction.update({
    where:{
      id:existingTransaction.id
    },
    data:{
      ...(title && {title}),
      ...(amount !==undefined && {amount}),
      ...(type && {type}),
      ...(note !== undefined && {note}),
      ...(date && {date: new Date(date)}),

      ...(accountId && {
        account:{
          connect:{
            id:accountId
          }
        }
      }),
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
      title:true,
      amount:true,
      type:true,
      note:true,
      date:true,
      account:{
        select:{
          id:true,
          name:true,
          type:true
        }
      },
      category:{
        select:{
          id:true,
          name:true,
          color:true,
          icon:true,

        }
      },
      createdAt:true,
      updatedAt:true
    }
  })

  return res.status(200).json(new ApiResponse(200, transaction ,"Transaction updated successfully"))

  })


//delete by Id
export const deleteTransactionById=asyncHandler(async(req,res)=>{
  
  const userId=req.user?.id

  if(!userId){
    throw new ApiError(400,"authorization error")
  }

  const {transactionId}=req.params

  if(!transactionId || Array.isArray(transactionId)){
    throw new ApiError(404,"transaction id is required")
  }

  const existingTransaction=await prisma.transaction.findFirst({
    where:{
      id:transactionId,
      userId
    }
  })

  if(!existingTransaction){
    throw new ApiError(404,"transaction doesn't exist")
  }

  await prisma.transaction.delete({
    where:{
      id:existingTransaction.id
    }
  })

  return res.status(200).json(new ApiResponse(200,null,"Transaction deleted"))

})