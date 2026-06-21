import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { ChevronRight, LayoutPanelTop, User } from 'lucide-react-native'
import { Link ,Href} from 'expo-router'
import ThemeToggle from '@/app/(usertab)/ThemeToggle'


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
    <View className='flex-col gap-y-4'>
      <Text className='text-neutral-200 text-xs font-extralight'>{texthead}</Text>
      <View className='box-block gap-y-5'>
        <Tabrow
        href={"/(usertab)/AccountPage"}
        icon={<User size={20} color={'#ffffff'}/>}
        tabName={'Account Settings'}/>

        <Tabrow
        href={"/(usertab)/CategoryPage"}
        icon={<LayoutPanelTop size={20} color={'#ffffff'}/>}
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
      className='w-full'>
     <View className=' flex-row gap-x-3 items-center justify-center'>
       {icon}
      <Text className='text-white '>{tabName}</Text>
     </View>
     
     <Pressable
     className="flex-grow">
      <ChevronRight
      size={20}
      color={'#ffffff'}/>
     </Pressable>
    </Link>

    </View>
  )
}