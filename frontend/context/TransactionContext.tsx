import { createContext,ReactNode } from "react";
import { createTransaction, getAllTransaction, getTransaction, updateTransaction, deleteTransaction } from "@/services/transactionServices";
import {useState,useEffect} from 'react'

export const TransactionContext=createContext<TransactionContextType| null>(null)

export const TransactionProvider=({children}:{children:ReactNode})=>{

  
    const [transactions,setTransactions]=useState<Transaction[]>([])
  
    const [singleTransaction,setSingleTransaction]=useState<Transaction |null>(null)
  
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
  
    const creatingNewTransaction=async(data:createTransactionProps)=>{
      try{
        setLoading(true)
        setError(null)
  
        const res=await createTransaction(data)
  
        setTransactions((prev)=>[res.data, ...prev])
  
        return res.data
  
      }catch(error:any){
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
      const fetchAllTransactions=async()=>{
      try{
        setLoading(true)
        setError(null)
        const res=await getAllTransaction()
  
        setTransactions(res.data)
  
        return res.data
  
  
      }catch(error:any){
        handleError(error)
  
      }finally{
        setLoading(false)
      }
    }
  
      const fetchTransaction=async(id:string)=>{
      try{
        setLoading(true)
        setError(null)
  
        const res=await getTransaction(id)
        setSingleTransaction(res.data)
        return res.data
  
      }catch(error:any){
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
      const editTransaction=async(id:string,data:updateTransactionProps)=>{
      try{
        setLoading(true)
        setError(null)
        const res=await updateTransaction(id,data)
  
        setTransactions((prev)=>
        prev.map((transaction)=>(transaction.id === id ? res.data:transaction)))
  
        setSingleTransaction((prev)=>prev?.id===id ?res.data:prev)
        
        return res.data
  
  
      }catch(error:any){
        
        handleError(error)
  
      }finally{
        setLoading(false)
      }
    }
  
      const removeTransaction=async(id:string)=>{
      try{
        setLoading(true)
        setError(null)
        await deleteTransaction(id)
  
        setTransactions((prev)=>prev.filter((transaction)=>transaction.id !==id))
  
        setSingleTransaction((prev)=>prev?.id===id?null:prev)
  
  
      }catch(error:any){
        
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
    useEffect(()=>{
      fetchAllTransactions()
    },[])


    return(
      <TransactionContext.Provider 
      value={{transactions,
    singleTransaction,
    error,
    loading,
    creatingNewTransaction,
    fetchAllTransactions,
    fetchTransaction,
    editTransaction,
    removeTransaction}}>
        {children}
      </TransactionContext.Provider>
    )
}