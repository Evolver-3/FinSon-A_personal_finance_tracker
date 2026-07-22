import { googleLogin, refreshToken, logout, logoutAllDevice, googleLoginWithCode} from "@/services/authServices";
import { useState } from "react";
import {saveTokens, clearTokens} from '../services/tokenStorage'


export const useAuth=()=>{
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

    loginCodeHook:(data:createLoginPageHookProps)=>
      run(async()=>{
        const res=await googleLoginWithCode(data)

          console.log("android res:", res)           // full response
          console.log("android res.data:", res.data) // { statusCode, data, message }
          console.log("android res.data.data:", res.data.data)

        const {accessToken,refreshToken}=res.data.data
         console.log('Hook: saving tokens...');
        await saveTokens(accessToken,refreshToken)
          console.log('Hook: tokens saved');

        return res.data.data
      }),

    loginTokenHook:(idToken:string)=>
      run(async()=>{

        const res=await googleLogin(idToken)

        //  console.log("google res:", res)           // full response
        //   console.log("google res.data:", res.data) // { statusCode, data, message }
        //   console.log("google res.data.data:", res.data.data)

        const {accessToken,refreshToken}=res.data.data
         console.log('Hook: saving tokens...');
        await saveTokens(accessToken,refreshToken)
          console.log('Hook: tokens saved');

        return res.data.data
      }),

    refreshAuthToken: (token: string) =>
      run(() => refreshToken(token)),

    logoutUser: (token: string) =>
      run(async()=>{
        const res=await logout(token)
        await clearTokens()
        return res
      }),

    logoutEverywhere: () =>
      run(() => logoutAllDevice())
  }
}
