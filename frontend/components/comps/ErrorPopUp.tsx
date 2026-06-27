import { View, Text } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type ErrorPopUpProps={
  errorMessage:string | null
}

const ErrorPopUp = ({errorMessage}:ErrorPopUpProps) => {
  const {isDark}=useTheme()

  return (
    <View style={{
      alignSelf:'flex-end',
      position:'absolute',
      right:0,
      top:-20
    }}>
      {errorMessage && (
      <Text className='text-xs rounded-xl px-3 py-2 font-semibold'
      style={{
        backgroundColor:isDark?"#1C1C1F":"#D9D2D4",
        color:isDark?"#E34A6E":"#F24B4B",
        elevation:4,
        borderWidth:1,
        borderColor:isDark?"#D6B4BE":"#E50B0B"
      }}>
        {errorMessage}</Text>)}
    </View>
  )
}

export default ErrorPopUp