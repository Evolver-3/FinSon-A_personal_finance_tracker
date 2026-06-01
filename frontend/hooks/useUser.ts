import { profileUpdate, changeAvatar } from "@/services/userServices";
import { useState } from "react";

export const useUser=()=>{
  const [user,setUser]=useState<User | null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string | null>(null)

  const updatingProfile=async(name:string)=>{
    try{
      setLoading(true)
      setError(null)
      
      const res=await profileUpdate({name})
      setUser(res.data)

      return res.data
    }catch(error:any){
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
      setError(message)
      throw error
      
    }finally{
      setLoading(false)

    }
  }

  const addingAvatar=async(avatar:FormData)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await changeAvatar(avatar)
      setUser(res.data)

      return res.data
    }catch(error:any){
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
      setError(message)
      throw error
      
    }finally{
      setLoading(false)

    }
  }

  return {
    user,loading,error,setUser,updatingProfile,addingAvatar
  }
}