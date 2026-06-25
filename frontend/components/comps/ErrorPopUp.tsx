import { View, Text } from 'react-native'
import React from 'react'

type ErrorPopUpProps={
  errorMessage:string | null
}
const ErrorPopUp = ({errorMessage}:ErrorPopUpProps) => {
  return (
    <View style={{
      alignSelf:'flex-end',
      position:'absolute',
      right:0,
      top:-20
    }}>
      <Text>
      {errorMessage && (
      <Text className='text-xs text-red-400 bg-neutral-600 rounded-xl px-3 py-2'>{errorMessage}</Text>)}
      </Text>
    </View>
  )
}

export default ErrorPopUp