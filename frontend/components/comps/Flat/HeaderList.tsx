import { View, Pressable} from 'react-native'
import React from 'react'
import TopUserComp from '../TopUserComp'
import { Plus} from 'lucide-react-native'
import ThemeIcon from '@/components/Theme/ThemeIcon'
import SearchBar from '@/components/Search/SearchBar'


const HeaderList = ({headingText,onPress,inlineText,setQuery}:HeaderListProps) => {

  return (
    <View className=' px-4 gap-y-4 pt-4'>
      <TopUserComp  
        headingText={headingText}/>
        
        <View className='flex-row items-center gap-x-2'>
          <SearchBar
          onSearch={setQuery}
          inlineText={inlineText}/>
          <Pressable
            className='addBtn borderOne'
            onPress={onPress}>
              <ThemeIcon
              icon={Plus}
              size={30}/>
            </Pressable>
        </View>
      </View>
  )
}

export default HeaderList