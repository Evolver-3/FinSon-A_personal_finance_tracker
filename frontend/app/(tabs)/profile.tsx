import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '@/components/WrapperPage'
import UserProfile from '@/components/profilePage/userProfile'


const profile = () => {
  return (
    <Wrapper>
      <View className='flex-1 px-4 gap-y-4 pt-4 flex-col jusitify-center'>
      
        <View className=''>
          <UserProfile/>
        </View>

        
        </View>
    </Wrapper>
  )
}

export default profile