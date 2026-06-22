import { View, Text } from 'react-native'
import React from 'react'
import {LucideIcon} from 'lucide-react-native'
import { useColorScheme } from 'nativewind'

type ThemeIconProps={
  icon:LucideIcon
  size:number
  darkColor?:string
  lightColor?:string
}
const ThemeIcon = ({icon:Icon,size,darkColor="#ffffff",lightColor="#000000"}:ThemeIconProps) => {

  const {colorScheme}=useColorScheme()
  const color=colorScheme==="dark"?darkColor:lightColor
  return (
   <Icon color={color} size={size}/>
  )
}

export default ThemeIcon