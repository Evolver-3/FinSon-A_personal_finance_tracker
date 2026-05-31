import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export const api=axios.create({
  baseURL:"http://192.168.1.5:5000/api/v1",
  headers:{
    "Content-Type":"application/json"
  }
})

api.interceptors.request.use(async(config)=>{
  const accessToken=await SecureStore.getItemAsync("accessToken")

  if(accessToken){
    config.headers.Authorization=`Bearer ${accessToken}`
  }

  return config
})