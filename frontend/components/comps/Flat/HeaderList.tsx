import { View, Text, Pressable} from 'react-native'
import React from 'react'
import TopUserComp from '../TopUserComp'
import { Search, Plus} from 'lucide-react-native'

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
            className='flex-row border border-neutral-500 rounded-lg w-8/10 p-2   gap-x-4 flex-grow'>
            <Search size={20} color={"#ffffff"}/>
              <Text className='text-sm text-white font-extralight'>{inlineText}</Text>
            </View>
            <Pressable
            className='rounded-lg p-2 bg-neutral-600 border border-neutral-600'
            onPress={onPress}>
              <Plus
              color={"#ffffff"}
              size={20}/>
            </Pressable>
          </View>
      </View>
  )
}

export default HeaderList