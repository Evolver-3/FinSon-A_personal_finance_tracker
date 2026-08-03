import { createContext,ReactNode } from "react";
import { createTransaction, getAllTransaction, getTransaction, updateTransaction, deleteTransaction, getTransactionByMonth } from "@/services/transactionServices";
import {useState,useEffect} from 'react'

export const TransactionContext=createContext<TransactionContextType| null>(null)

export const TransactionProvider=({children}:{children:ReactNode})=>{

  
    const [transactions,setTransactions]=useState<Transaction[]>([])
    const [transactionsMonthly,setTransactionsMonthly]=useState<Transaction[]>([])
  
    const [singleTransaction,setSingleTransaction]=useState<Transaction |null>(null)
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
  
    const handleError=(error:any)=>{
  
      console.log("=== FULL ERROR in hooks ===")
      console.log("error.response:", error?.response)
      console.log("error.response?.data:", error?.response?.data)
      
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
      setError(message)
  
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
        return null
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
        return null
  
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
        return null
      }finally{
        setLoading(false)
      }
    }

    const getTransactionByPeriod=async(year:number,month:number)=>{
      try{
        setLoading(true)
        setError(null)

        console.log("In the hook:")
        const res=await getTransactionByMonth(year,month)

        console.log("hooks:",res)
        const transactions=Array.isArray(res.data)? res.data:[]
        setTransactionsMonthly(transactions || [])
        console.log("Hook consoled:",transactions)
        return transactions

      }catch(error:any){
        handleError(error)
        return null
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
        return null
  
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
  
  let year=Number(new Date().getFullYear)
  let month=Number(new Date().getMonth())
    useEffect(()=>{
      getTransactionByPeriod(year,month)
    },[])


    return(
      <TransactionContext.Provider 
      value={{transactions,
    singleTransaction,
    transactionsMonthly,
    error,
    loading,
    creatingNewTransaction,
    fetchAllTransactions,
    fetchTransaction,
    getTransactionByPeriod,
    editTransaction,
    removeTransaction}}>
        {children}
      </TransactionContext.Provider>
    )
}