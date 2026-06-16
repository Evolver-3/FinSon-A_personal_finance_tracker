import { View, Text, Pressable, Modal, ScrollView, ViewStyle, TextInput} from 'react-native'
import React from 'react'
import { TextData } from '../comps/TextData'
import { categorydynamicColors, CategoryIcons } from '@/data'
import { ButtonNeed } from '../comps/ButtonNeed'
import { SelectColors, SelectIcon, SelectType } from '../category/CreateCategory'

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
}
const CreateAccount = ({openCreate,setOpenCreate,name,setName,type,setType,color,setColor,handleCreateAccount,loading,icon,setIcon,balance,setBalance}:createAccountProps) => {
  return (
    <Modal
      visible={openCreate}
      transparent={true}
      animationType='slide'
      onRequestClose={() => setOpenCreate(false)}>
        <View className=" flex-1">
          <Pressable
            style={{
              flex:2,
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
            onPress={()=>setOpenCreate(false)}/>
            
            <View className='bg-neutral-900 rounded-t-3xl pt-10 px-7 flex-col gap-y-8 '
              style={{flex:2}}
              onStartShouldSetResponder={() => true}>
                <Text className='text-white text-lg font-semibold '>
                  Add Account
                </Text>
                
                <TextData
                  tagexist={false}
                  tag={''}
                  value={name}
                  placeholder='e.g., Food' 
                  onChangeText={setName}
                  secureTextEntry={false}/>

                  <TextData
                  
                  tagexist={false}
                  tag={''}
                  value={balance}
                  placeholder='0'
                  onChangeText={setBalance}
                  secureTextEntry={false}/>
               

                <View className='items-center justify-center '>
                  <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">
                    <SelectType
                      focused={type==="CARD"}
                      onPress={()=>setType("CARD")}
                      text='Card'/>
       
                    <SelectType
                      focused={type==="BANK"}
                      onPress={()=>
                      setType("BANK")}
                      text='Bank'/>
                    
                    <SelectType
                      focused={type==="CASH"}
                      onPress={()=>
                      setType("CASH")}
                      text='Cash'/>
                  
                    <SelectType
                      focused={type==="WALLET"}
                      onPress={()=>
                      setType("WALLET")}
                      text='Wallet'/>
                  
                  </View>
       
                  <View className=' flex-row gap-x-3'>
                    <Text className='text-md font-semibold text-white'>Choose Color</Text>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal
                    contentContainerClassName='items-center'
                    className='flex-row'
                    contentContainerStyle={{alignItems:"center",
                      gap:10}}>
                      {categorydynamicColors.map((col,id)=>(
                      <View key={id}
                      className=''>
                        <SelectColors
                        style={{
                        backgroundColor:col.btncolor
                        }}
                        focused={color.btncolor===col.btncolor}
                        onPress={()=>setColor(col)}
                        />
                      </View>
                    ))}
                    </ScrollView>
                  </View>
    
                  <View className='flex-row items-center justify-between '>
                    {CategoryIcons.map((tag)=>(
                      <SelectIcon
                      key={tag.id}
                      name={tag.name}
                      icon={tag?.name}
                      focused={icon===tag.name}
                      onPress={()=>
                        setIcon(tag.name)}
                    />
                    ))}
                  </View>
    
                   <ButtonNeed
                   style={{}}
                  onPress={handleCreateAccount}
                  text={'Create new'}
                  loading={loading}
                  disabled={loading}
                  />
              </View>                
            </View>
        </View>
    </Modal>
  )
}

export default CreateAccount
