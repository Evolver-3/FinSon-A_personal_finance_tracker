import { View, Text,Image} from 'react-native'
import React,{useEffect} from 'react'
import { useAccount } from '@/hooks/useAccount'

import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
const index = () => {

   const {fetchAllAccounts,accounts,loading}=useAccount()

    useEffect(()=>{
  
      fetchAllAccounts()
    },[])
  
    const totalBalance=accounts.reduce((total,account)=>{
      return total+Number(account.balance)
    },0)
  return (
    <Wrapper loading={loading}>
       <View className='flex-1 px-4 gap-y-4 pt-4'>
      <TopUserComp
      headingText={""}/>
      
      <View className='boxBlock'>
        <Text className='text-white text-xs'>TOTAL BALANCE</Text>
        <Text className='text-white text-3xl'>{totalBalance? totalBalance :0}</Text>
        

      </View>

      <View className='boxBlock'>
       

      </View>
    </View>

    </Wrapper>
  ) 
}

export default index