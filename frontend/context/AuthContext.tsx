import { View, Text } from 'react-native'
import React, { createContext,useContext,useEffect,useState } from 'react'
import { clearTokens, getAccessToken } from '@/services/tokenStorage'
import { getProfile } from '@/services/userServices'

const AuthContext =createContext<AuthContextType | null> (null) 

export const AuthProvider=({children}:{children:React.ReactNode})=>{

  const [user,setUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(true)


    const loadUser=async()=>{
      try{ 
        const token=await getAccessToken()

        if(!token){
          setUser(null)
          return
        }

        const res=await getProfile()
        setUser(res.data)

      }catch(error){
        setUser(null)
        await clearTokens()
      }finally{
        setLoading(false)
      }
    }
  useEffect(()=>{
    loadUser()
  },[])

  return(
    <AuthContext.Provider value={{user,loading,setUser,loadUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext=()=>{
  const context=useContext(AuthContext)

  if(!context){
    throw new Error("useAuthContext must be used inside AuthProvider")
  }

  return context
}