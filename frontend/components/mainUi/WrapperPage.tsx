import { View,  ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({children,loading}:wrapperProps) => {
  return (
<SafeAreaView className="flex-1 bg-white dark:bg-neutral-950 ">
    {loading? (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator/>
      </View>
      ):(
      <View className='flex-1 bg-gray-200 dark:bg-neutral-950'>
      {children}
    </View>
    )}
  </SafeAreaView>
)}

export default Wrapper