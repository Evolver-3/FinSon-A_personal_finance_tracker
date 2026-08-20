import { useAuthHook } from "./useAuthHook";
import { profileUpdate, changeAvatar} from "@/services/userServices"
import { useCallback, useState } from "react";

export const useUser=()=>{

  const {backendUser,setBackendUser,loadBackendUser}=useAuthHook()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string | null>(null)

  const fetchUserProfile=useCallback(async()=>{
     try{
      setLoading(true)
      setError(null)
      
     const res=await loadBackendUser()
     console.log("useUser user:",res)
     return res
     

    }catch(error:any){
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
      setError(message)
      throw error
      
    }finally{
      setLoading(false)

    }
  },[])

  const updatingProfile=async(name:string)=>{
    try{
      setLoading(true)
      setError(null)
      
      const res=await profileUpdate({name})
      setBackendUser(res.data)
      console.log("hooks update useUser:",res.data)

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
     const res=await setBackendUser
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
    backendUser,loading,error,updatingProfile,addingAvatar,fetchUserProfile
  }
}