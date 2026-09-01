import {api} from './api'

export const syncbackend=async(token:string)=>{
  const res=await api.post("/auth/sync",{},
   { 
    headers:{
    Authorization:`Bearer ${token}`
  }})

  console.log("syncBackend services response:", res)

  return res.data.data || res.data
}

export const getMe=async()=>{
  const res=await api.get("/auth/user")

  console.log("getMe service response:", res)

  return res.data.data || res.data
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



