import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '@/components/WrapperPage'
import AvatarUpload from '@/components/profilePage/AvatarUpload'
import LogoutPage from '@/components/profilePage/LogoutPage'
import Preferences from '@/components/profilePage/Preferences'

const profile = () => {
  return (
    <Wrapper loading={false}>
      <View className="boxInnerSize">
        <AvatarUpload/>
        <Preferences/>
        <LogoutPage/>
      </View>
    </Wrapper>
  )
}

export default profile