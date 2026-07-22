import React, { createContext,useContext,useEffect,useState } from 'react'
import { clearTokens, getAccessToken } from '@/services/tokenStorage'
import { getProfile } from '@/services/userServices'

const AuthContext =createContext<AuthContextType | null> (null) 

export const AuthProvider=({children}:{children:React.ReactNode})=>{

  const [user,setUser]=useState<User|null>(null)
  const [loading,setLoading]=useState(true)
  const [initialized,setInitialized]=useState(false)


    const loadUser=async()=>{

      if(initialized)return;

      try{ 

        console.log("loadUser: starting...")
        setLoading(true)
        const token=await getAccessToken()

        console.log('loadUser: token?',token?'exists':"missing")

        if(!token){

          console.log('loadUser: no token, setting user null')
          setUser(null)
          return
        }

        console.log('loadUser: calling getProfile...')

        const res=await getProfile()

        console.log("loadUser: getProfile returned:", JSON.stringify(res, null, 2));
    
        console.log("loadUser: res.data?", res.data);


        setUser(res.data || res)


      }catch(error:any){
       if(error?.response?.status=== 401){
        setUser(null)
        await clearTokens()
       }
      }finally{
        setLoading(false)
        setInitialized(true)
      }
    }
  useEffect(()=>{
      loadUser()
  },[])

  return(
    <AuthContext.Provider value={{user,loading,setUser,loadUser,initialized}}>
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