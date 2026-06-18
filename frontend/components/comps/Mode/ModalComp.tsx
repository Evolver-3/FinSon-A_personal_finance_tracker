import { View, Text, Modal, Pressable, ScrollView, ViewStyle} from 'react-native'
import React from 'react'
import { AccountIcons, CategoryIcons } from '@/data'
import { TextData } from '../TextData'

type ModalCompProps={
  visible:boolean 
  onRequestClose:()=>void 
  textblock:string 
  children:React.ReactNode
  pressableFlex?:number 
  viewFlex?:number

}
const ModalComp = ({visible,onRequestClose,textblock,children,pressableFlex,viewFlex}:ModalCompProps) => {
  return (
     <Modal
        visible={visible}
        transparent={true}
        animationType='slide'
        onRequestClose={onRequestClose}>
       
          <View className=" flex-1">
       
            <Pressable
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              flex:pressableFlex,
            }}
            onPress={onRequestClose}/>
              <View className='bg-neutral-900 rounded-t-3xl pt-4 px-7 flex-col gap-y-4 '
              style={{flex:viewFlex}}
              onStartShouldSetResponder={() => true}>
                <Text className='text-white text-lg font-semibold '>
                 {textblock}
                </Text>
                
                {children}
              </View>
        
            </View>
        </Modal>
  )
}

export default ModalComp


type SelectTypeProps={
  text:string 
  onPress:()=>void
  focused:boolean

}

export const SelectType=({text,onPress,focused}:SelectTypeProps)=>{
  return (
    <Pressable
    style={{
      flex:1,
      paddingHorizontal:8,
      paddingVertical:8,
      borderRadius:8,
      alignItems:'center',
      backgroundColor:focused?"#262626":"transparent"
    }}
    onPress={onPress}>
      <Text 
      style={{
        fontSize:14,
        fontWeight:"400",
        textAlign:"center",
        color:focused?"#60a5fa":"#000000"
      }}>{text}</Text>
    </Pressable>
  )
}

type SelectColorProps={
  onPress:()=>void
  focused:boolean
  style:ViewStyle  

}

export const SelectColors=({onPress,focused,style}:SelectColorProps)=>{
  return (
    <Pressable
    className={` p-3 rounded-full items-center border ${focused?"border border-white":"border-0"}`}
    style={style}
    onPress={onPress}>
    </Pressable>
  )
}

type TabIconProps={
  icon: string | null
  onPress:()=>void
  focused:boolean
  name:string
}


export const SelectIcon=({icon,onPress,focused,name}:TabIconProps)=>{
  return (
    <Pressable 
    style={{
      alignItems:'center',
      justifyContent:"center",
      padding:7,
      borderRadius:8,
      borderWidth:focused?1:0,
      borderColor:focused?"#60a5fa":"transparent",
      backgroundColor:focused?"#1e293b":'transparent'
    }}
    onPress={onPress}
    >
    {getIconByName(name,focused)}
    </Pressable>
  )
}


export const SelectAccountIcon=({icon,onPress,focused,name}:TabIconProps)=>{
  return (
    <Pressable 
    style={{
      alignItems:'center',
      justifyContent:"center",
      padding:7,
      borderRadius:8,
      borderWidth:focused?1:0,
      borderColor:focused?"#60a5fa":"transparent",
      backgroundColor:focused?"#1e293b":'transparent'
    }}
    onPress={onPress}
    >
    {getAccountIconByName(name,focused)}
    </Pressable>
  )
}


export const getIconByName=(name:string | null, focused:boolean)=>{
  if(!name) return null 

  const found=CategoryIcons.find(c=>c.name===name)

  return found?found.symbol(focused):null
}

export const getAccountIconByName=(name:string | null,focused:boolean)=>{
  if(!name) return null 

  const found=AccountIcons.find(c=>c.name===name)

  return found?found.symbol(focused):null
}