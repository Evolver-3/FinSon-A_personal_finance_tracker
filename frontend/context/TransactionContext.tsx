import { handleError } from "@/lib/handleError";
import { createContext,ReactNode } from "react";
import { createTransaction, getTransaction, updateTransaction, deleteTransaction, getTransactionByYear } from "@/services/transactionServices";
import {useState,useEffect} from 'react'

export const TransactionContext=createContext<TransactionContextType| null>(null)

export const TransactionProvider=({children}:{children:ReactNode})=>{

  
    const [transactions,setTransactions]=useState<Transaction[]>([])
    
    const [transactionsYearly,setTransactionsYearly]=useState<TransactionsYearlyProps>(
      {
        months:[],
        year:new Date().getFullYear().toString()
      })

  
    const [singleTransaction,setSingleTransaction]=useState<Transaction |null>(null)
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
  
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

    const getByYear=async(year:number)=>{
      try{
        setLoading(true)
        setError(null)
        const res=await getTransactionByYear(year)

        const transactionsdetail=(res.data)?res.data:[]

        setTransactionsYearly(transactionsdetail || [])

        return transactionsdetail

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
      // getTransactionByPeriod(year,month)
      getByYear(year)
    },[])


    return(
      <TransactionContext.Provider 
      value={{transactions,
    singleTransaction,
    error,
    loading,
    creatingNewTransaction,
    fetchTransaction,
    getByYear,
    editTransaction,
    removeTransaction,
    transactionsYearly}}>
        {children}
      </TransactionContext.Provider>
    )
}