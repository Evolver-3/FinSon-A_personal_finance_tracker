import { createAccount, getAllAccounts,getSingleAccount, updateAccount, deleteAccount } from '@/services/accountServices'
import { useEffect, useState } from "react";

export const useAccount=()=>{

  const [accounts,setAccounts]=useState<Account[]>([])
  const [selectedAccount,setSelectedAccount]=useState<Account | null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  const handleError=(error:any)=>{

    console.log("=== FULL ERROR ===")
    console.log(error)
    console.log("error.response:", error?.response)
    console.log("error.response?.data:", error?.response?.data)
    const message=error?.message?.data?.message || error?.message || "Something went wrong"

    setError(message)
    throw error 
  }

  const creatingAccount=async(data:createAccountProps)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await createAccount(data)
      setAccounts((prev)=>[res.data, ...prev])
      console.log("hooks res:",res.data)
      return res.data

    }catch(error:any){

     handleError(error)

    }finally{
      setLoading(false)
    }
  }

  const fetchAllAccounts=async()=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getAllAccounts()
      setAccounts(res.data)
      return res.data


    }catch(error:any){
      
      handleError(error)

    }finally{
      setLoading(false)
    }
  }
  

  const fetchSingleAccount=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)
      const res=await getSingleAccount(id)

      console.log("fetchSingle--res.data",res.data)

      console.log("fetchSingle--res.data.data",res.data.data)

      setSelectedAccount(res.data)
      return res.data


    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }
  }


    const editAccount=async(id:string,data:updateAccountProps)=>{
    try{
      setLoading(true)
      setError(null)
      const res=await updateAccount(id,data)

      console.log("edit account does it even work:",res)

      setAccounts((prev)=>
      prev.map((acc)=>(acc.id === id ? res.data:acc)))

      setSelectedAccount((prev)=>
      prev?.id === id? res.data: prev)
      
      return res.data


    }catch(error:any){
      
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

    const removeAccount=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)
      await deleteAccount(id)

      setAccounts((prev)=>prev.filter((acc)=>acc.id !==id))

      setSelectedAccount((prev)=>prev?.id ===id? null :prev)


    }catch(error:any){
    
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllAccounts()
  },[])

  return {
    accounts,
    loading,
    error,
    fetchAllAccounts,
    removeAccount,
    editAccount,
    creatingAccount,
    selectedAccount,
    fetchSingleAccount
  }
}