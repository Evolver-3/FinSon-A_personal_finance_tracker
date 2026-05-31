import {api} from './api'

export const registerUser=async(data:registrationProps)=>{
  const res=await api.post("/auth/register",data)

  return res.data
}

export const loginUser=async(data:loginProps)=>{
  const res=await api.post("/auth/login",data)
  return res.data
}

export const verifyEmail=async(token:string)=>{
  const res=await api.get(`/auth/verify-email?token=${token}`)
  return res.data
}

export const resendEmail=async(email:string)=>{
  const res=await api.post("/auth/resend-email",{email})
  return res.data
}

export const refreshToken=async(refreshToken:string)=>{
  const res=await api.post("/auth/refreshToken",{refreshToken})
  return res.data
}

export const logout=async(refreshToken:string)=>{
  const res=await api.post("/auth/logout",{refreshToken})
  return res.data
}

export const logoutAllDevice=async()=>{
  const res=await api.post("/auth/logoutAllDevice")
  return res.data
}

export const passwordReset=async(data:changePasswordProps)=>{
  const res=await api.post("/auth/password-reset",data)
  return res.data
}


export const forgotPassword=async(email:string)=>{
  const res=await api.post("/auth/forgot-password",{email})
  return res.data
}


export const resetPassword=async(token:string,data:resetPasswordProps)=>{
  const res=await api.post(`/auth/reset-password?token=${token}`,data)
  return res.data
}

export const getProfile=async()=>{
  const res=await api.get("/auth/profile")
  return res.data
}


