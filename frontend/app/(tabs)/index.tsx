import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
  <SafeAreaView className="flex-1 bg-slate-50 dark:bg-neutral-950 ">
    <View className='flex-1 bg-green-600'>
      <Text>Hello</Text>
    </View>
  </SafeAreaView>
  )
}

export default index