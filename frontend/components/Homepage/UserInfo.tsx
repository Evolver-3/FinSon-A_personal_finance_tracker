import { View, Text,Image} from 'react-native'
import React,{useEffect} from 'react'

import { useUser } from '@/hooks/useUser'
import { useAccount } from '@/hooks/useAccount'

const UserInfo = () => {
  const {fetchUserProfile,user,loading}=useUser()
  const {fetchAccount,accounts}=useAccount()
  
  useEffect(()=>{
  
    fetchUserProfile()
    fetchAccount()
  },[])

  const totalBalance=accounts.reduce((total,account)=>{
    return total+Number(account.balance)
  },0)

  return ( 
    <View className='flex-1 px-4 gap-y-4 pt-4'>
      <View className="flex-row justify-around ">
        <Image source={{uri:user?.avatar as any}}
        style={{width:30,height:30, borderRadius:40}}/>    
       
        <Text className='text-white'>{user?.name}</Text>  
          
      </View>

      <View className='bg-black rounded-xl shadow-md p-5 border border-slate-900'>
        <Text className='text-white text-xs'>TOTAL BALANCE</Text>
        <Text className='text-white text-3xl'>{totalBalance? totalBalance :0}</Text>
        

      </View>

      <View className='bg-black rounded-xl shadow-md p-5 border border-slate-900'>
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
