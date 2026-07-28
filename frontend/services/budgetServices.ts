import {api} from './api'

export const createBudget=async(data:createBudgetProps)=>{
  const res=await api.post("/budget",data)
  return res.data
}


export const updateBudget=async(budgetId:string,data:updateBudgetProps)=>{
  const res=await api.patch(`/budget/${budgetId}`,data)
  return res.data
}

export const deleteBudget=async(budgetId:string)=>{
  const res=await api.delete(`/budget/${budgetId}`)
  console.log("service data",res.data)
  return res.data
} 

export const checkSpending=async(month:number,year:number)=>{
  const res=await api.get(`/budget?month=${month}&year=${year}`,)
  return res.data
}