import { View, Text,Pressable } from 'react-native'
import React, {useState} from 'react'
import ProfileWrap from '@/components/profilePage/ProfileWrap'
import { ThemeData } from '@/data'
import ThemeIcon from '@/components/Theme/ThemeIcon'
import { useColorScheme } from 'nativewind'
import { Check } from 'lucide-react-native'


const ThemeSettings = () => {
  const {colorScheme,setColorScheme}=useColorScheme()
  const [selectedTab,setSelectedTab]=useState(colorScheme || 'system')
  
  const handlePress=(scheme:string)=>{
    setSelectedTab(scheme)
    setColorScheme(scheme as any)
  }

  return (
     <ProfileWrap
     textValue='Theme settings'
     dataHasHref={false}
     >
      <View className='bg-white dark:bg-[#1B1C1B]  rounded-2xl overflow-hidden mt-10'>
        {ThemeData.map((i,index)=>(
          <View
            key={i.id} 
            className={`${index !== ThemeData.length-1?' border-b-[0.5px] border-b-[#f0f0f0da] dark:border-b-[#706c6c5c]':''}`}>
            <Pressable
              className='py-[18px] px-4 flex-row w-full items-center'
              onPress={()=>handlePress(i.scheme)}>
            <View className='flex-row gap-x-2 items-center flex-1'>
              <ThemeIcon
              icon={i.symbol}
              size={20}
              darkColor={"#E7E7E7"}
              lightColor={'#000000'}
              />
              <Text className='text-lg dark:text-[#E7E7E7]'>{i.text}</Text>
            </View>
            {selectedTab=== i.scheme && (
              <ThemeIcon
              icon={Check}
              size={20}
              darkColor={"#E7E7E7"}
              lightColor={'#000000'}
              />
            )}
            
          </Pressable>
            </View>
          
        ))}

      </View>
     </ProfileWrap>
  )
}

export default ThemeSettings