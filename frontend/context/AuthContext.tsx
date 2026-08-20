import React, { createContext,useEffect,useState } from 'react'
import {useAuth} from '@clerk/clerk-expo'
import { getMe, logoutAllDevice, refreshToken, syncbackend } from '@/services/authServices'

export const AuthContext =createContext<AuthContextType | null> (null) 

export const AuthProvider=({children}:{children:React.ReactNode})=>{
  const {isLoaded,isSignedIn,getToken}=useAuth()
  const [backendUser,setBackendUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)


  //error handling
  const handleError=(error:any)=>{
  const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
  setError(message)
  throw error
  }

  //loadBackendUser with the token
  const loadBackendUser=async()=>{
    try{
      if(!isLoaded)return
      setLoading(true)

      if(!isSignedIn){
        setBackendUser(null)
        return
      }

      const token=await getToken()

      if(!token){
        setBackendUser(null)
        return
      }

      const user:User=await getMe()
      console.log("token is correct, then getMe should give user details")
      setBackendUser(user)
    }catch(err:any){
      handleError(err)
      setBackendUser(null)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadBackendUser()
  },[isLoaded,isSignedIn])
  const syncBackendHook=async(token:string)=>{
    setLoading(true)
    setError(null)
    try{
      const res=await syncbackend(token)
      console.log("token in hook is correct then get res from syncbackend:", res)
      setBackendUser(res)
      return res

    }catch(err:any){
      setError(err)

    }finally{
    setLoading(false)
    }
    }
  
  const refreshAuthToken=async(token: string)=>{
    setLoading(true)
    setError(null)
    try{
      await refreshToken(token)
    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }} 

  const logoutEverywhere=async()=>{
    setLoading(true)
    setError(null)
    try{
      await logoutAllDevice()
    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }} 
  

  return(
    <AuthContext.Provider value={{backendUser,loading,setBackendUser,loadBackendUser,syncBackendHook,refreshAuthToken,logoutEverywhere,error}}>
      {children}
    </AuthContext.Provider>
  )
}

