import { useAuthContext } from "@/context/AuthContext";
import { profileUpdate, changeAvatar} from "@/services/userServices"
import { useState } from "react";

export const useUser=()=>{
  const {user,setUser}=useAuthContext()

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string | null>(null)

  const fetchUserProfile=async()=>{
     try{
      setLoading(true)
      setError(null)
      
     const res=await setUser
     return res
     

    }catch(error:any){
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
      setError(message)
      throw error
      
    }finally{
      setLoading(false)

    }
  }

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

      await changeAvatar(avatar)
     const res=await setUser
     return res
      
    }catch(error:any){
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
      setError(message)
      throw error
      
    }finally{
      setLoading(false)

    }
  }

  return {
    user,loading,error,updatingProfile,addingAvatar,fetchUserProfile
  }
}