import { View, Text, Pressable, Modal, ScrollView, ViewStyle, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import React from 'react'
import { TextData } from '../comps/TextData'
import { AccountIcons, categorydynamicColors, CategoryIcons } from '@/data'
import { ButtonNeed } from '../comps/ButtonNeed'
import ModalComp, { SelectAccountIcon, SelectColors, SelectType } from '../comps/Mode/ModalComp'

type createAccountProps={
  openCreate:boolean 
  setOpenCreate:React.Dispatch<React.SetStateAction<boolean>>
  name:string 
  setName:React.Dispatch<React.SetStateAction<string>>
  type:string
  setType:React.Dispatch<React.SetStateAction< "CASH" | "BANK" | "CARD" | "WALLET">>
  color:CategoryColor
  setColor:React.Dispatch<React.SetStateAction<CategoryColor>>
  handleCreateAccount:()=>void
  loading:boolean
  icon:string|null
  setIcon:React.Dispatch<React.SetStateAction<string| null>>
  balance:string
  setBalance:React.Dispatch<React.SetStateAction<string>>
  error:string | null
}

const CreateAccount = ({openCreate,setOpenCreate,name,setName,type,setType,color,setColor,handleCreateAccount,loading,icon,setIcon,balance,setBalance,error}:createAccountProps) => {
  return (
   <ModalComp
   visible={openCreate}
   onRequestClose={()=>setOpenCreate(false)}
   textblock={'Create Account'}
   pressableFlex={3}
    viewFlex={3}>
      

    <TextData
    keyboardType="default"
      tagexist={false}
      tag={''}
      value={name}
      placeholder='CNB' 
      onChangeText={setName}
      secureTextEntry={false}/>

    <TextData
    keyboardType="decimal-pad"
    tagexist={false}
    tag={''}
    value={balance}
    placeholder='0.00'
    onChangeText={setBalance}
    secureTextEntry={false}/>
    
    <View className='items-center justify-center mt-3'>
      <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-50  dark:bg-neutral-600 rounded-xl">

        <SelectType
        focused={type==="CARD"}
        onPress={()=>setType("CARD")}
        text='Card'/>
       
        <SelectType
        focused={type==="BANK"}
        onPress={()=>setType("BANK")}
        text='Bank'/>
                    
        <SelectType
        focused={type==="CASH"}
        onPress={()=>setType("CASH")}
        text='Cash'/>
                  
        <SelectType
        focused={type==="WALLET"}
        onPress={()=>setType("WALLET")}
        text='Wallet'/>

      
    </View>
                  
      </View>
       
      <View className=' flex-row gap-x-3 mt-2 items-center'>
        <Text className='text-md font-semibold text-white'>Choose Color</Text>
        
        <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerClassName='items-center'
        className='flex-row'
        contentContainerStyle={{alignItems:"center",gap:10}}>
          
          {categorydynamicColors.map((col,id)=>(
            <View key={id}>
              <SelectColors
                style={{
                  backgroundColor:col.btncolor
                }}
                focused={color.btncolor===col.btncolor}
                onPress={()=>setColor(col)}/>
            </View>))}
        </ScrollView>
      </View>
    
      <View className='flex-row items-center justify-between '>
        {AccountIcons.map((tag)=>(
          <SelectAccountIcon
          style={{}}
          key={tag.id}
          name={tag.name}
          icon={tag?.name}
          focused={icon===tag.name}
          onPress={()=>setIcon(tag.name)}/>))}
      </View>
      <ButtonNeed
        style={{}}
        onPress={handleCreateAccount}
        text={'Create new'}
        loading={loading}
        disabled={loading}/>
      

   </ModalComp>
  )
}

export default CreateAccount
