import {api} from './api'

export const createTransaction=async(data: createTransactionProps)=>{
  const res=await api.post("/transaction",data)
  return res.data
}


export const getTransaction=async(transactionId:string)=>{
  const res=await api.get(`/transaction/${transactionId}`)
  return res.data
}

export const getTransactionByYear=async(year:number)=>{

  const res=await api.get(`/transaction/queryYear?year=${year}`)

  console.log("service:",res.data)

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