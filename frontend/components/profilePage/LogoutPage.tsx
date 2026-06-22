import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { LogOut } from 'lucide-react-native'
import { clearTokens, getAccessToken } from '@/services/tokenStorage'
import { router } from 'expo-router'
import { useAuthContext } from '@/context/AuthContext'
import ThemeIcon from '../Theme/ThemeIcon'

const LogoutPage = () => {

  const { logoutUser}=useAuth()
  const {setUser}=useAuthContext()

  const handleLogout=async()=>{
    try{
      const token=await getAccessToken()

      if(token){
        await logoutUser(token)
      }
      setUser(null)
      router.replace("/(auth)/sign-in")
    }catch(error){
      await clearTokens()
      setUser(null)
      router.replace("/(auth)/sign-in")
    }

  }
  return (
    <View className='mt-10 border dark:border-red-400 border-red-200  rounded-md py-3 items-center bg-red-300 dark:bg-red-500'>
      <Pressable
      onPress={handleLogout}>
        <View className='flex-row items-center gap-x-2'>
          <ThemeIcon
          icon={LogOut}
          size={20}/>
          <Text className='text-black dark:text-white font-semibold text-lg'>Log Out</Text>
        </View>


      </Pressable>
    </View>
  )
}

export default LogoutPage