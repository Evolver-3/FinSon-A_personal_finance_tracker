import {api} from './api'

export const profileUpdate=async(name:string)=>{
  const res=await api.patch("/user/profile-update",{name})
 
  return res.data
}

export const avatar=async(avatar:string)=>{
  const res=await api.patch("/user/avatar",{avatar})

  return res.data
}