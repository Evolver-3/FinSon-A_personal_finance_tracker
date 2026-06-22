import { View, Text ,Pressable} from 'react-native'
import React,{useState} from 'react'
import { useColorScheme } from 'nativewind'
import { SelectType } from '@/components/comps/Mode/ModalComp'


const ThemeToggle = () => {
  const {colorScheme,toggleColorScheme}=useColorScheme()
  
  return (
    <Pressable
    onPress={toggleColorScheme}
    className='rounded-lg bg-white flex-row p-1 border-1 border-neutral-300 '>

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