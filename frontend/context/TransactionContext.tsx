import { createContext,ReactNode } from "react";
import { createTransaction, getTransaction, updateTransaction, deleteTransaction, getTransactionByYear } from "@/services/transactionServices";
import {useState,useEffect} from 'react'
import {useAuth as useClerkAuth} from '@clerk/clerk-expo'
import { useGuest } from "@/hooks/useGuest";

export const TransactionContext=createContext<TransactionContextType| null>(null)

export const TransactionProvider=({children}:{children:ReactNode})=>{

  const {isSignedIn}=useClerkAuth()
  const guest=useGuest()

  const isGuest=!isSignedIn

    const [transactions,setTransactions]=useState<Transaction[]>(isGuest?guest.transactions:[])
    
    const [transactionsYearly,setTransactionsYearly]=useState<TransactionsYearlyProps>(
      {
        months:[],
        year:new Date().getFullYear().toString()
      })

  
    const [singleTransaction,setSingleTransaction]=useState<Transaction |null>(null)
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)

    useEffect(()=>{
      if(isGuest){
        setTransactions(guest.transactions)
      }
    },[guest.transactions,isGuest])

    useEffect(()=>{
      if(!isGuest){
        getByYear(new Date().getFullYear())
      }
    },[isGuest])
  
    const handleError=(error:any)=>{
    const message=error?.response?.data?.message || error?.message || "Something went wrong"
    
    setError(message)
    throw error
    }
  
    const creatingNewTransaction=async(data:createTransactionProps)=>{
        setLoading(true)
        setError(null)
      try{
        const newTransaction:Transaction={
          id:Date.now().toString(),
          ...data,
          createdAt:new Date().toISOString()
        }

        if(isGuest){
          guest.addTransaction(newTransaction)
        }

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

      if(isGuest){
        const found=guest.transactions.find((t)=>t.id===id) || null
        setSingleTransaction(found)
        return found
      }
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
      if(isGuest)return guest.transactions
        setLoading(true)
        setError(null)
      try{

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
      setLoading(true)
      setError(null)
      try{
        if(isGuest){
          guest.updatedTransaction(id,data)

          setTransactions((prev)=>prev.map((trx)=>trx.id===id?{...trx,...data}:trx))
          setSingleTransaction((prev)=>prev?.id===id?{...prev,...data}:prev)

          return {...singleTransaction,...data} as Transaction
        }
        
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
        setLoading(true)
        setError(null)
      try{
        if(isGuest){
          guest.removeTransaction(id)
          setSingleTransaction((prev)=>(prev?.id===id?null:prev))
        }

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