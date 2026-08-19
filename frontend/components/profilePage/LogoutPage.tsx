import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { router } from 'expo-router'
import { useAuthHook } from '@/hooks/useAuthHook'
import { useClerk } from '@clerk/clerk-expo'
import { useTheme } from '@/hooks/useTheme'

const LogoutPage = () => {

  const [loading,setLoading]=useState(false)
  const { signOut}=useClerk()
  const {setBackendUser}=useAuthHook()
  const {isDark}=useTheme()

  const handleLogout=async()=>{

    setLoading(true)
    try{
      await signOut()
   setBackendUser(null)
   router.replace("/(auth)/Login")
    }finally{
      setLoading(false)
    }
 

  }
  return (
    <View className='mt-10  rounded-md items-center bg-white dark:bg-[#1B1C1B]'>

      <Pressable
      onPress={handleLogout}
      android_ripple={{color:isDark?'#1F1F21':"",foreground:true}}
      className="w-full items-center py-5">
        {loading ? (
          <View className='flex-row items-center gap-x-5 '>
          <Text className='text-black dark:text-white font-semibold text-lg'>Log Out</Text>
          <ActivityIndicator color={isDark?"#ffffff":"#000000"}/>
        </View>
        ):(
          <View className='flex-row items-center gap-x-2'>
          <Text className='text-black dark:text-white font-semibold text-lg'>Log Out</Text>
        </View>
        )}

      </Pressable>
    </View>
  )
}

export default LogoutPage