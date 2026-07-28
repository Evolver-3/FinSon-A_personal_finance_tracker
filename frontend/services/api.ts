import axios from 'axios'
import { getFreshClerkToken } from './clerkTokenManager'

export const api=axios.create({
  baseURL:"http://192.168.1.4:5000/api/v1",
  headers:{
    "Content-Type":"application/json",
  }
})

api.interceptors.request.use(async(config)=>{
  const token=await getFreshClerkToken()

  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }

  return config
})