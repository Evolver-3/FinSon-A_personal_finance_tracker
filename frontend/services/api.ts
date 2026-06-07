import axios from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from './tokenStorage'

export const api=axios.create({
  baseURL:"http://192.168.1.7:5000/api/v1",
  headers:{
    "Content-Type":"application/json",
    
  }
})

api.interceptors.request.use(async(config)=>{
  const accessToken=await getAccessToken()

  if(accessToken){
    config.headers.Authorization=`Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response)=>response,
  async(error)=>{
    const originalRequest=error.config

    if(error.response?.status===401 && !originalRequest._retry){
      originalRequest._retry=true

      try{
        const refreshToken=await getRefreshToken()

        if(!refreshToken){
          await clearTokens()
          return Promise.reject(error)
        }
        const res=await axios.post(
          "http://192.168.1.7:5000/api/v1/auth/refreshToken",
          {refreshToken:refreshToken}
        )

        const newAccessToken=res.data.data.accessToken
        const newRefreshToken = res.data.data.refreshToken

        await saveTokens(newAccessToken, newRefreshToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      }catch (refreshError) {
        await clearTokens()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)

  }
)