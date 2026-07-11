import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { getAccountIconByName } from '../comps/Mode/ModalComp'
import { Pencil } from 'lucide-react-native'
import UpdateAccount from './UpdateAccount'
import { useTheme } from '@/hooks/useTheme'
import { formatAmount } from '@/app/(tabs)/home'
import PressedAnimate from '../comps/Animate/PressedAnimate'

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

  
  const [removePageLoading,setRemovePageLoading]=useState(false)

  const {isDark}=useTheme()

  const handledeleteAccount=async()=>{
        try{
          setRemovePageLoading(true)
          if(!item?.id)return

          await removeAccount(item?.id)
          setOpenEdit(false)
          
        }catch(err:any){
          console.log(error)
          console.log(err)

        }finally{
          setRemovePageLoading(false)
        }
      }
  
  return (

    <View className='px-4'>
      <View
      className='rounded-xl py-6 px-4 mainbg mainborder flex-col gap-y-4'
      style={{
        backgroundColor:isDark?"#212121":item.color.colors,
        elevation:2
      }}>
        <View className='flex-grow flex-row gap-x-5 items-center'>
          <View
          className='p-2 items-center rounded-lg '
          style={{
            elevation:5,
            backgroundColor:item.color.darkColor
          }}>
            {getAccountIconByName(item.icon,false,isDark?"#000000":"#ffffff",24)}
          </View>

          <View>
          <Text 
            className=' text-md biggerText uppercase'
            style={{
              fontFamily:"Sans-Bold"
            }}>
              {item.name}
          </Text>

          <Text 
            className="text-green-400 text-md">
              {formatAmount(item.balance)}
          </Text>
          </View>

          <View 
            className='px-2 py-1 rounded-md'
                  style={{
                      backgroundColor:"#C4B6D2"
                    }}>
                <Text
                style={{
                          color:isDark?"#000000":"#ffffff",
                          fontSize:8,
                          fontFamily:"Sans-Semibold"
                        }}>
                  {item.type}
                </Text>
            
          </View>

        <View className='flex-row gap-x-5 justify-end flex-grow'>
          <PressedAnimate
            onPress={()=>setOpenEdit(true)}
            originalColor={isDark?"#518151":"#ADF7B3"}
            pressedColor={isDark?"#49B649":"#CEE9D0"}
            style={{
              width:40,
              height:20,
              borderRadius:5,
              alignItems:"center",
              justifyContent:"center",
              elevation:6}}>
                    
            <Text
              className="smallText text-xs"
              style={{
                      fontFamily:"Sans-Semibold"
                    }}>
                      Edit
            </Text>
          </PressedAnimate>
                    
          <PressedAnimate
            onPress={handledeleteAccount}
            originalColor={isDark?"#753B2F":"#D28E89"}
            pressedColor={"#EAA59E"}
            style={{
              width:60,
              height:20,
              borderRadius:5,
              alignItems:'center',
              justifyContent:"center",
              elevation:6}}>
        
              {removePageLoading ?
              (<ActivityIndicator color={"#ffffff"} size={10}/>):
              <Text 
                className="smallText text-xs"
                style={{
                          fontFamily:"Sans-Semibold"
                      }}>
                  Remove
              </Text>}
          </PressedAnimate>
        </View>

        </View>

      
    
      </View>
   
      <UpdateAccount
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      account={selectedAccount}
      editAccount={editAccount}
      loading={loading}
      error={error}/>
                 
    </View>
  )
}

export default AccountItem