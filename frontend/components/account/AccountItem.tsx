import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { getAccountIconByName } from '../comps/Mode/ModalComp'
import { useTheme } from '@/hooks/useTheme'
import PressedAnimate from '../comps/Animate/PressedAnimate'
import { formatAmount } from '../comps/DateFormat'
import { useCurrency } from '@/context/CurrencyContext'
import AccountData from './AccountData'
import ThemeIcon from '@/components/Theme/ThemeIcon'


const AccountItem = ({item,editAccount,removeAccount}:AccountItemProps) => {
  const [openEdit,setOpenEdit]=useState(false)
  const [selectedAccount,setSelectedAccount]=useState<Account| null>(null)

  const {symbol}=useCurrency()
  
  const [editLoad,setEditLoad]=useState(false)
  const [ deleteLoad,setDeleteLoad]=useState(false)
  const [pageError,setPageError]=useState("")

  const {isDark}=useTheme()

  const handledeleteAccount=async()=>{

    setDeleteLoad(true)
    setPageError("")
    try{
        if(!item?.id)return

        await removeAccount(item?.id)
          
        }catch(err:any){
         const message=err?.response?.data?.message || err?.message || "Failed to sign in"

        setPageError(message)
        }finally{
          setDeleteLoad(false)
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

          <View>
          <ThemeIcon icon={symbol} size={20}/>

          <Text 
            className="text-green-400 text-md">
              {formatAmount(item.balance)}
          </Text>
          </View>
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
        
              {deleteLoad ?
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
   
      <AccountData
      initialValues={{
        name:item.name,
        balance:item.balance,
        type:item.type,
        color:item?.color.btncolor,
        icon:item.icon
      }}
      submitText={"Edit your account"}
      openModal={openEdit}
      setOpenModal={setOpenEdit}
      loading={editLoad}
      error={pageError}
      pressableFlex={2}
      viewFlex={4}
      
      onSubmit={async(values)=>{
        setEditLoad(true)
        setPageError("")
        try{
          await editAccount(item.id,{...values})
        }catch(err:any){
          const message=err?.response?.data?.message || err?.message || "Failed to sign in"
        setPageError(message)
        }finally{
          setEditLoad(false)
        }
      }}/>
                 
    </View>
  )
}

export default AccountItem