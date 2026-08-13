import { View,Text,ScrollView,Pressable} from 'react-native'
import React from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import ThemeIcon from '@/components/Theme/ThemeIcon'
import { ChevronRight} from 'lucide-react-native'
import { Link } from 'expo-router'
import { useTheme } from '@/hooks/useTheme'


const ProfileWrap = ({textValue,dataMap,dataHasHref,extraChild,children}:ProfileWrapProps) => {
  return (
    <Wrapper loading={false}>
      <View className='px-4  py-4 flex-1'>

        <Text className='text-neutral-900 dark:text-white text-xl font-medium text-center mb-3'>{textValue}</Text>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap:4, marginTop:2}}>
          
          {dataHasHref ?
          (<LinkData
          dataMap={dataMap}
          />)
          :
          (extraChild)
          }
          {children}

        </ScrollView>
      </View>
    </Wrapper>
  )
}

export default ProfileWrap


export const LinkData=({dataMap}:LinkDataProps)=>{
  const {isDark}=useTheme()
  return(<>
   { 
   dataMap?.map((item)=>(
    <View 
    key={item.id} 
    className='flex-1 flex-col gap-y-2 mt-4'>
      <Text className='text-neutral-500 text-md font-extraLight px-4'>{item.key}</Text>
      <View className='bg-white dark:bg-[#1B1C1B]  rounded-2xl overflow-hidden'>
        {item.items.map((i,index)=>(
        <View
          key={i.name} 
          className={`${index !== item.items.length-1?' border-b-[0.5px] border-b-[#f0f0f0da] dark:border-b-[#706c6c5c]':''}`}>
            <Link href={i.href}  asChild>
            <Pressable
              android_ripple={{color:isDark?'#1F1F21':"",foreground:true}}
              className={`py-[18px] px-4 flex-row w-full items-center `} >            
                <View className='flex-row gap-x-2 items-center flex-1'>
                  <ThemeIcon
                    icon={i.symbol}
                    size={18}
                    darkColor={"#E7E7E7"}
                    lightColor={'#000000'}/>
                  <Text className='text-lg dark:text-[#E7E7E7]'>{i.name}</Text>
                </View>
                <ThemeIcon
                icon={ChevronRight}
                size={25}
                darkColor={"#706c6c5c"}
                lightColor={"#CFCFCF"}/>
            </Pressable>
            </Link>
        </View>))}
      </View>
    </View>
  ))}
  </>
  )
}