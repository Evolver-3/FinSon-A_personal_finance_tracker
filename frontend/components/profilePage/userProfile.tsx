import { View, Text } from 'react-native'
import React from 'react'
import AvatarUpload from './AvatarUpload'
import LogoutPage from './LogoutPage'

const UserProfile = () => {
  return (
    <View className='mt-10 items-center '>
      <AvatarUpload/>
      <LogoutPage/>
    </View>
  )
}

export default UserProfile