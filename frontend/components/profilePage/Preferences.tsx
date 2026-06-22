import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { ChevronRight, LayoutPanelTop, User } from 'lucide-react-native'
import { Link ,Href} from 'expo-router'
import ThemeToggle from '@/components/Theme/ThemeToggle'
import ThemeIcon from '../Theme/ThemeIcon'


const Preferences = () => {
  return (
     <View className=''>
            <Tabs texthead={"PREFERENCES"}/>
      </View>
  )
}

export default Preferences



type textheadProps={
  texthead:string 

}

export const Tabs=({texthead}:textheadProps)=>{
  return(
    <View className='flex-col gap-y-8'>
      <Text className='smallText text-xs font-extralight'>{texthead}</Text>
      <View className='box-block gap-y-5'>
        <Tabrow
        href={"/(usertab)/AccountPage"}
        icon={<ThemeIcon icon={User} size={20}/>}
        tabName={'Account Settings'}/>

        <Tabrow
        href={"/(usertab)/CategoryPage"}
        icon={<ThemeIcon icon={LayoutPanelTop} size={20}/>}
        tabName={'Categories'}/>

        <ThemeToggle/>

      </View>
    </View>
  )
}

type tabRowType={
  icon:React.ReactNode 
  tabName:string
  href:Href
}
export const Tabrow=({icon,tabName,href}:tabRowType)=>{
  return(
    <View className='flex-row justify-between '>
      <Link href={href}
      className='items-center'>
     <View className=' flex-row gap-x-3 items-center justify-center'>
       {icon}
      <Text className='dark:text-white text-slate-900 '>{tabName}</Text>
     </View>
     
     <Pressable
     className="flex-grow">
      <ThemeIcon icon={ChevronRight} size={20}/>
     </Pressable>
    </Link>

    </View>
  )
}