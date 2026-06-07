import { createAccount, getAccount, updateAccount, deleteAccount } from '@/services/accountServices'
import { useEffect, useState } from "react";

export const useAccount=()=>{

  const [accounts,setAccounts]=useState<Account[]>([])
  const [accountOne,setAccountOne]=useState<Account| null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  const handleError=(error:any)=>{
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
      return res.data

    }catch(error:any){

     handleError(error)

    }finally{
      setLoading(false)
    }
  }

    const fetchAccount=async()=>{
    try{
      setLoading(true)
      setError(null)
      const res=await getAccount()
      setAccounts(res.data)
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

      setAccounts((prev)=>
      prev.map((acc)=>(acc.id === id ? res.data:acc)))

      setAccountOne((prev)=>
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

      setAccountOne((prev)=>prev?.id ===id? null :prev)


    }catch(error:any){
    
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAccount()
  },[])

  return {
    accounts,
    loading,
    error,
    fetchAccount,
    createAccount,
    removeAccount,
    editAccount,
    creatingAccount
  }
}