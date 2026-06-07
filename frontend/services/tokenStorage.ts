// import * as SecureStore from 'expo-secure-store'

// export const saveTokens=async(
//   accessToken:string,
//   refreshToken:string
// )=>{
//   await SecureStore.setItemAsync("accessToken",accessToken)
//   await SecureStore.setItemAsync("refreshToken",refreshToken)
// }

// export const getAccessToken=async()=>{
//   return await SecureStore.getItemAsync("accessToken")
// }

// export const getRefreshToken=async()=>{
//   return await SecureStore.getItemAsync("refreshToken")
// }

// export const clearTokens=async()=>{
//   await SecureStore.deleteItemAsync("accessToken")
//   await SecureStore.deleteItemAsync("refreshToken")
// }

// services/tokenStorage.ts
import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"

export const getAccessToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("accessToken")
  }

  return SecureStore.getItemAsync("accessToken")
}

export const getRefreshToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem("refreshToken")
  }

  return SecureStore.getItemAsync("refreshToken")
}

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    return
  }

  await SecureStore.setItemAsync("accessToken", accessToken)
  await SecureStore.setItemAsync("refreshToken", refreshToken)
}

export const clearTokens = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return
  }

  await SecureStore.deleteItemAsync("accessToken")
  await SecureStore.deleteItemAsync("refreshToken")
}