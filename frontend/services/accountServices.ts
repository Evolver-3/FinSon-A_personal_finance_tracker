import {api} from './api'

export const createAccount=async(data:createAccountProps)=>{
  const res=await api.post("/account",data)
  return res.data
}

export const getAccount=async()=>{
  const res=await api.get("/account")
  return res.data
}

export const updateAccount=async(accountId:string,data:updateAccountProps)=>{
  const res=await api.post(`/account/${accountId}`,data)
  return res.data
}

export const deleteAccount=async(accountId:string)=>{
  const res=await api.post(`/account/${accountId}`)
  return res.data
}
