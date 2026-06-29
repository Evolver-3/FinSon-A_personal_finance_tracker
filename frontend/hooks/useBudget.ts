import { createBudget, updateBudget, deleteBudget, checkSpending } from "@/services/budgetServices";

import {useState,useEffect} from 'react'


export const useBudget=()=>{

  const [budgets,setbudgets]=useState<Budget[]>([])

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  const handleError=(error:any)=>{
    const message=error?.response?.data?.message || error?.message || "Something went wrong"

    setError(message)
    throw error

  }

  const creatingNewBudget=async(data:createBudgetProps)=>{
    try{
      setLoading(true)
      setError(null)

      await createBudget(data)

      const now=new Date()
      await spendingBudget(now.getMonth()+1,now.getFullYear())
 
    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

    const editBudget=async(id:string,data:updateBudgetProps)=>{
    try{
      setLoading(true)
      setError(null)
      await updateBudget(id,data)

      const now=new Date()
      await spendingBudget(now.getMonth()+1,now.getFullYear())

    }catch(error:any){
      
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

    const removeBudget=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)
      await deleteBudget(id)

      const now=new Date()
      await spendingBudget(now.getMonth()+1,now.getFullYear())

    }catch(error:any){
      
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  const spendingBudget=async(month:number,year:number)=>{
    try{
      setLoading(true)
      setError(null)
      const res=await checkSpending(month,year)

      console.log("raw res:", res)
      console.log("res.data:", res.data)
      console.log("first item:", res.data[0])
      setbudgets(res.data)
      return res.data
      
    }catch(error:any){
      handleError(error)
 
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    const now=new Date()
    spendingBudget(now.getMonth()+1,now.getFullYear())
  },[])

  return {
    budgets,
    error,
    loading,
    creatingNewBudget,
    editBudget,
    removeBudget,
    spendingBudget
  }
}