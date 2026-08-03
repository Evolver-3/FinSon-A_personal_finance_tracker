import {api} from './api'

export const createTransaction=async(data: createTransactionProps)=>{
  const res=await api.post("/transaction",data)
  return res.data
}

export const getAllTransaction=async()=>{
  const res=await api.get("/transaction")
  return res.data
}

export const getTransaction=async(transactionId:string)=>{
  const res=await api.get(`/transaction/${transactionId}`)
  return res.data
}

export const getTransactionByMonth=async(year:number, month:number)=>{
  // console.log("does it reaches service:")
  const res=await api.get(`/transaction/period?year=${year}&month=${month}`)

  // console.log("data from service:", res.data)

  return res.data
}


export const updateTransaction=async(transactionId:string,data:updateTransactionProps)=>{
  const res=await api.patch(`/transaction/${transactionId}`,data)
  return res.data
}

export const deleteTransaction=async(transactionId:string)=>{
  const res=await api.delete(`/transaction/${transactionId}`)
  return res.data
} 