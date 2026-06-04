import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type wrapperProps={
  children:ReactNode
}
const Wrapper = ({children}:wrapperProps) => {
  return (
<SafeAreaView className="flex-1 bg-slate-50 dark:bg-neutral-950 ">
    <View className='flex-1 bg-neutral-950 dark:bg-neutral-950'>
      {children}
    </View>
  </SafeAreaView>
)}

export default Wrapper