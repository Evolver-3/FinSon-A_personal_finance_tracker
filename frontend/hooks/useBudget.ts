import { createBudget, getAllBudget, getBudget, updateBudget, deleteBudget } from "@/services/budgetServices";

import {useState,useEffect} from 'react'


export const useBudget=()=>{

  const [budgets,setbudgets]=useState<Budget[]>([])

  const [singleBudget,setSingleBudget]=useState<Budget|null>(null)

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  const handleError=(error:any)=>{

    console.log("=== FULL ERROR ===")
    console.log(error)
    console.log("error.response:", error?.response)
    console.log("error.response?.data:", error?.response?.data)
    const message=error?.response?.data?.message || error?.message || "Something went wrong"

    setError(message)
    throw error

  }

  const creatingNewBudget=async(data:createBudgetProps)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await createBudget(data)

      setbudgets((prev)=>[res.data, ...prev])

      return res.data

    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

    const fetchAllBudgets=async()=>{
    try{
      setLoading(true)
      setError(null)
      const res=await getAllBudget()

      setbudgets(res.data)

      return res.data


    }catch(error:any){
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

    const fetchBudget=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getBudget(id)

      setSingleBudget(res.data)
      return res.data

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
      const res=await updateBudget(id,data)

      setbudgets((prev)=>
      prev.map((budget)=>(budget.id === id ? res.data:budget)))

      setSingleBudget((prev)=>prev?.id===id ?res.data:prev)
      
      return res.data


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

      setbudgets((prev)=>prev.filter((budget)=>budget.id !==id))

      setSingleBudget((prev)=>prev?.id===id?null:prev)


    }catch(error:any){
      
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllBudgets()
  },[])

  return {
    budgets,
    singleBudget,
    error,
    loading,
    creatingNewBudget,
    fetchAllBudgets,
    fetchBudget,
    editBudget,
    removeBudget
  }
}