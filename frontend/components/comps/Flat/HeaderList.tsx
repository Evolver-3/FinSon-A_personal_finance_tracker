import { View, Text, Pressable} from 'react-native'
import React from 'react'
import TopUserComp from '../TopUserComp'
import { Search, Plus} from 'lucide-react-native'
import ThemeIcon from '@/components/Theme/ThemeIcon'

type HeaderListProps={
  headingText:string 
  onPress:()=>void
  inlineText:string
}
const HeaderList = ({headingText,onPress,inlineText}:HeaderListProps) => {
  return (
    <View className=' px-4 gap-y-4 pt-4'>
      <TopUserComp
        headingText={headingText}/>
        
        <View className='flex-row items-center gap-x-2'>
          <View
            className='flex-row border border-slate-400 dark:border-neutral-500 rounded-lg w-8/10 p-2   gap-x-4 flex-grow'>
             <ThemeIcon
              icon={Search}
              size={20}/>
              <Text className='text-sm smallText font-extralight'>{inlineText}</Text>
            </View>
            <Pressable
            className='rounded-lg p-2 bg-white dark:bg-neutral-600 border border-slate-200 dark:border-neutral-400'
            onPress={onPress}>
              <ThemeIcon
              icon={Plus}
              size={20}/>
            </Pressable>
          </View>
      </View>
  )
}

export default HeaderList