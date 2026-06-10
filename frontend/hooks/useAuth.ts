import { registerUser,loginUser, verifyEmail, resendEmail, refreshToken, logout, logoutAllDevice, passwordReset, forgotPassword, resetPassword} from "@/services/authServices";
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

    register:(data:registrationProps)=>
      run(()=>registerUser(data)),

    login:(data:loginProps)=>
      run(async()=>{
        const res=await loginUser(data)
        
        await saveTokens(res.data.accessToken,res.data.refreshToken)

        return res
      }),

    verifyEmailToken:(token:string)=>
      run(()=>verifyEmail(token)),

    resendVerificationEmail: (email: string) =>
      run(() => resendEmail(email)),

    refreshAuthToken: (token: string) =>
      run(() => refreshToken(token)),

    logoutUser: (token: string) =>
      run(async()=>{
        const res=await logout(token)
        await clearTokens()
        return res
      }),

    logoutEverywhere: () =>
      run(() => logoutAllDevice()),

    changePassword: (data: changePasswordProps) =>
      run(() => passwordReset(data)),

    sendForgotPasswordEmail: (email: string) =>
      run(() => forgotPassword(email)),

    resetUserPassword: (token: string, data: resetPasswordProps) =>
      run(() => resetPassword(token, data))
  }
}
