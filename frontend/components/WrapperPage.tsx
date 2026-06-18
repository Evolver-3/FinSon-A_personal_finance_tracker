import { View, Text, ActivityIndicator } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type wrapperProps={
  children:ReactNode
  loading:boolean
}
const Wrapper = ({children,loading}:wrapperProps) => {
  return (
<SafeAreaView className="flex-1 bg-slate-50 dark:bg-neutral-950 ">
    {loading? (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator />
      </View>
      ):(
      <View className='flex-1 bg-neutral-950 dark:bg-neutral-950'>
      {children}
    </View>
    )}
  </SafeAreaView>
)}

export default Wrapper