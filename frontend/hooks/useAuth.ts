import { registerUser,loginUser, verifyEmail, resendEmail, refreshToken, logout, logoutAllDevice, passwordReset, forgotPassword, resetPassword, getProfile} from "@/services/authServices";
import { useState } from "react";

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
      run(()=>loginUser(data)),

    verifyEmailToken:(token:string)=>
      run(()=>verifyEmail(token)),

    resendEmailToken:(token:string)=>
      run(()=>resendEmail(token)),

    resendVerificationEmail: (email: string) =>
      run(() => resendEmail(email)),

    refreshAuthToken: (token: string) =>
      run(() => refreshToken(token)),

    logoutUser: (token: string) =>
      run(() => logout(token)),

    logoutEverywhere: () =>
      run(() => logoutAllDevice()),

    changePassword: (data: changePasswordProps) =>
      run(() => passwordReset(data)),

    sendForgotPasswordEmail: (email: string) =>
      run(() => forgotPassword(email)),

    resetUserPassword: (token: string, data: resetPasswordProps) =>
      run(() => resetPassword(token, data)),

    fetchProfile: () =>
      run(()=>getProfile())
  }
}
