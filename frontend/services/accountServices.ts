import {api} from './api'

export const createAccount=async(data:createAccountProps)=>{
  const res=await api.post("/account",data)
  return res.data
}

export const getAllAccounts=async()=>{
  const res=await api.get("/account")
  return res.data
}

export const getSingleAccount=async(accountId:string)=>{
  const res=await api.get(`/account/${accountId}`)
  return res.data
}


export const updateAccount=async(accountId:string,data:updateAccountProps)=>{
  const res=await api.patch(`/account/${accountId}`,data)
  console.log("updateAccount sevice:", res.data)
  return res.data
}

export const deleteAccount=async(accountId:string)=>{
  const res=await api.delete(`/account/${accountId}`)
  return res.data
}
