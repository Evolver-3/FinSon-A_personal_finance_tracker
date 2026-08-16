import { createAccount, getAllAccounts,getSingleAccount, updateAccount, deleteAccount } from '@/services/accountServices'
import { useEffect, useState } from "react";
import {useAuth as useClerkAuth} from '@clerk/clerk-expo'
import { useGuest } from './useGuest';

export const useAccount=()=>{

  const {isSignedIn}=useClerkAuth()
  const guest=useGuest()

  const isGuest=!isSignedIn

  const [accounts,setAccounts]=useState<Account[]>(isGuest?guest.accounts:[])

  const [selectedAccount,setSelectedAccount]=useState<Account | null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  useEffect(()=>{
    if(isGuest){
      setAccounts(guest.accounts)
    }
  },[guest.accounts,isGuest])

  useEffect(()=>{
    if(!isGuest){
      fetchAllAccounts()
    }
  },[isGuest])

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

      setLoading(true)
      setError(null)
    try{
      const newAccount:Account={
        id:Date.now().toString(),
        ...data,
        createdAt:new Date().toISOString()
      }

      if(isGuest){
        guest.addAccount(newAccount)
      }

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
    if(isGuest) return guest.accounts
      setLoading(true)
      setError(null)

    try{
 
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

    if(isGuest){
      const found=guest.accounts.find((a)=>a.id===id ) || null 
      setSelectedAccount(found)
      return found
    }
    try{
      setLoading(true)
      setError(null)
      const res=await getSingleAccount(id)

      setSelectedAccount(res.data)
      return res.data


    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }
  }


    const editAccount=async(id:string,data:updateAccountProps)=>{
      setLoading(true)
      setError(null)
    try{

      if(isGuest){
        guest.updatedAccount(id,data)

        setAccounts((prev)=>
          prev.map((acc)=>(acc.id===id?{...acc,...data}:acc)))
        setSelectedAccount((prev)=>
        prev?.id===id?{...prev,...data}:prev)
        return{...selectedAccount,...data} as Account
      }


      const res=await updateAccount(id,data)


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
      setLoading(true)
      setError(null)
    try{
      if(isGuest){
        guest.removeAccount(id)
        setSelectedAccount((prev)=>(prev?.id===id?null:prev))
        return
      }

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