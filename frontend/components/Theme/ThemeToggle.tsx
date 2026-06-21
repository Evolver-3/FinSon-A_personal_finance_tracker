import { View, Text ,Pressable} from 'react-native'
import React,{useState} from 'react'
import { useColorScheme } from 'nativewind'
import { SelectType } from '@/components/comps/Mode/ModalComp'


const ThemeToggle = () => {
  const {colorScheme,toggleColorScheme}=useColorScheme()


  const isDark=colorScheme==="dark"
  return (
    <Pressable
    onPress={toggleColorScheme}
    className='rounded-lg bg-red-500 flex-row '>

      <SelectType
      focused={colorScheme==="light"}
      onPress={()=>colorScheme !== "light" && toggleColorScheme()}
      text='light'/>

      <SelectType
      focused={colorScheme==="dark"}
      onPress={()=>colorScheme !=="dark" && toggleColorScheme()}
      text="Dark"/>

    </Pressable>
  )
}

export default ThemeToggle