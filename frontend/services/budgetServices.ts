import {api} from './api'

export const createBudget=async(data:createBudgetProps)=>{
  const res=await api.post("/budget",data)
  return res.data
}

export const getAllBudget=async()=>{
  const res=await api.get("/budget")
  return res.data
}

export const getBudget=async(budgetId:string)=>{
  const res=await api.get(`/budget/${budgetId}`)
  return res.data
}


export const updateBudget=async(budgetId:string,data:updateBudgetProps)=>{
  const res=await api.patch(`/budget/${budgetId}`,data)
  return res.data
}

export const deleteBudget=async(budgetId:string)=>{
  const res=await api.delete(`/budget/${budgetId}`)
  return res.data
} 