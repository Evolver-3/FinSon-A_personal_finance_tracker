import { refreshToken, logout, logoutAllDevice, syncbackend} from "@/services/authServices";
import { useState } from "react";


export const useAuthHook=()=>{
  const [error,setError]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)



  const run=async<T>(fn:()=>Promise<T>)=>{

    try{

      setLoading(true)
      setError(null)

      const data=await fn()
      return data

    }catch(err:any){
      const message=err?.response?.data?.message || err?.message || "Something went wrong"
      console.log("full error:", JSON.stringify(err?.response?.data))

      setError(message)
      throw err

    }finally{
      setLoading(false)
    }
  }

  return {
    loading,
    error,

    syncBackendHook:(token:string)=>run(async()=>{
      const res=await syncbackend(token)
      return res
    }),

    refreshAuthToken: (token: string) =>
      run(() => refreshToken(token)),

    // logoutUser: (token: string) =>
    //   run(async()=>{
    //     const res=await logout(token)
    //     await clearTokens()
    //     return res
    //   }),

    logoutEverywhere: () =>
      run(() => logoutAllDevice())
  }
}
