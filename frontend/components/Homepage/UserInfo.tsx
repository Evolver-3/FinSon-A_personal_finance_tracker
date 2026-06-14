import { View, Text,Image} from 'react-native'
import React,{useEffect} from 'react'

import { useUser } from '@/hooks/useUser'
import { useAccount } from '@/hooks/useAccount'
import TopUserComp from '../comps/TopUserComp'
import { useAuthContext } from '@/context/AuthContext'

const UserInfo = () => {
 
  const {fetchAccount,accounts}=useAccount()
  const {user}=useAuthContext()
  useEffect(()=>{

    fetchAccount()
  },[])

  const totalBalance=accounts.reduce((total,account)=>{
    return total+Number(account.balance)
  },0)

  return ( 
    <View className='flex-1 px-4 gap-y-4 pt-4'>
      <TopUserComp
      headingText={""}/>
      
      <View className='boxBlock'>
        <Text className='text-white text-xs'>TOTAL BALANCE</Text>
        <Text className='text-white text-3xl'>{totalBalance? totalBalance :0}</Text>
        

      </View>

      <View className='boxBlock'>
        {/* {accounts.map((account)=>{
          <View key={account?.id}>
            <Text>{account.name}</Text>

          </View>
        })} */}

      </View>
    </View>
  )
}

export default UserInfo
