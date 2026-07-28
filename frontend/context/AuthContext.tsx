import React, { createContext,useContext,useEffect,useState } from 'react'

import {useAuth,useUser} from '@clerk/clerk-expo'

const AuthContext =createContext<AuthContextType | null> (null) 

export const AuthProvider=({children}:{children:React.ReactNode})=>{

  const [user,setUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(true)

  const {isLoaded,isSignedIn}=useAuth()
  const {user:clerkUser}=useUser()

  useEffect(()=>{
    if(!isLoaded)return ;

    if(isSignedIn && clerkUser){
      setUser({
        id:clerkUser.id,
        name:`${clerkUser.firstName} ${clerkUser.lastName}`,
        email:clerkUser.emailAddresses[0]?.emailAddress,
        avatar:clerkUser.imageUrl
      })
    }else{
      setUser(null)
    }

    setLoading(false)
  },[isLoaded,isSignedIn,clerkUser])

  return(
    <AuthContext.Provider value={{user,loading,setUser}}>
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