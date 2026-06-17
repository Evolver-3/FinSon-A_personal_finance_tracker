import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '@/components/WrapperPage'


const Transactions = () => {
  return (
    <Wrapper loading={false}>
       <View className='flex-1 px-4 gap-y-4 pt-4'>

        <Text className='text-white text-xl font-semibold'>New Transaction</Text>

        <View>
          
        </View>
      </View>
    </Wrapper>
  )
}

export default Transactions