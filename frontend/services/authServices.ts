import {api} from './api'

export const googleLoginWithCode=(data:createLoginPageHookProps)=>{
  return api.post("/auth/google/code",data)
}

export const googleLogin=(idToken:string)=>{
  return api.post("/auth/google",{idToken})
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



