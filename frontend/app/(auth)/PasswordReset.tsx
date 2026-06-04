import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'

const PasswordReset = () => {

  const {resetUserPassword}=useAuth()
  
  return (
    <View>
      <Text>PasswordReset</Text>
    </View>
  )
}

export default PasswordReset