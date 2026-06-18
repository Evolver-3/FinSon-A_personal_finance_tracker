import axios from 'axios'
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from './tokenStorage'
import { router } from 'expo-router'

export const api=axios.create({
  baseURL:"http://192.168.1.4:5000/api/v1",
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
          "http://192.168.1.4:5000/api/v1/auth/refreshToken",
          {refreshToken:refreshToken}
        )

        const {accessToken,refreshToken:newRefreshToken}=res.data.data

        await saveTokens(accessToken, newRefreshToken)

        api.defaults.headers.common.Authorization =`Bearer ${accessToken}`

        originalRequest.headers = {...originalRequest.headers,Authorization: `Bearer ${accessToken}`,}

        return api(originalRequest)
      }catch (refreshError) {
        await clearTokens()
        router.replace("/(auth)/sign-in")
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)

  }
)