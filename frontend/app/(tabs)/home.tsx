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
       <View className='boxInnerSize'>
      <TopUserComp
      headingText={""}/>
      
      <View className='boxBlock'>
        <Text className='smallText text-xs'>TOTAL BALANCE</Text>
        <Text className='biggerText text-3xl'>{totalBalance? totalBalance :0}</Text>
        

      </View>

      <View className='boxBlock'>
       

      </View>
    </View>

    </Wrapper>
  ) 
}

export default index