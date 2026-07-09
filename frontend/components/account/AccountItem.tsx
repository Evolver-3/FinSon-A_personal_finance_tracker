import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { getAccountIconByName } from '../comps/Mode/ModalComp'
import { Pencil } from 'lucide-react-native'
import UpdateAccount from './UpdateAccount'
import { useTheme } from '@/hooks/useTheme'

type AccountItemProps={
  item:Account 
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  removeAccount:(id:string)=>Promise<void>
  loading:boolean
  selectedAccount:Account | null
  error:string | null
}
const AccountItem = ({item,editAccount,removeAccount,loading,error}:AccountItemProps) => {
  const [openEdit,setOpenEdit]=useState(false)
  const [selectedAccount,setSelectedAccount]=useState<Account| null>(null)

  const {isDark}=useTheme()
  
  return (

    <View className='px-4'>
      <View
      className='flex-row items-center mainborder  rounded-xl p-4 '
      style={{
        backgroundColor:isDark? "#212121":item.color.colors,
        elevation:2
        }}>
        <View className='flex-grow flex-row gap-x-4 items-center'>
          <View
          className='p-2 items-center rounded-lg '
          style={{
            elevation:5,
            backgroundColor:item.color.darkColor
          }}>
            {getAccountIconByName(item.icon,false,"#000000")}
          </View>
       
          <View className=''>
            <View className='flex-row items-center gap-x-4'>
              <Text className='text-lg text-neutral-500'>
                {item.name}
              </Text>
              <View className='p-[2px] rounded-xl'
              style={{
                backgroundColor:`${item.color.colors}`
              }}>
                <Text
                style={{
                color:`${item.color.btncolor}`,
                fontSize:8
                }}>
                  {item.type}
                </Text>
              </View>
            </View>
            <Text 
              className={`text-sm text-neutral-700 font-semibold `}>
                  {item.balance}
              </Text>
          </View>

        </View>
       
        <Pressable
          onPress={()=>{
          setOpenEdit(true)
          setSelectedAccount(item)}}>
            <Pencil
              color={'#000000'}
              size={18}/>
        </Pressable>
    
      </View>
   
      <UpdateAccount
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      account={selectedAccount}
      editAccount={editAccount}
      removeAccount={removeAccount}
      loading={loading}
      error={error}/>
                 
    </View>
  )
}

export default AccountItem