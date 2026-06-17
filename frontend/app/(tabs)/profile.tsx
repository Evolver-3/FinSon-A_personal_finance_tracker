import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '@/components/WrapperPage'
import AvatarUpload from '@/components/profilePage/AvatarUpload'
import LogoutPage from '@/components/profilePage/LogoutPage'

const profile = () => {
  return (
    <Wrapper loading={false}>
      <View className="flex-col px-4 gap-y-4 pt-4">
        <AvatarUpload/>
        <LogoutPage/>
      </View>
    </Wrapper>
  )
}

export default profile