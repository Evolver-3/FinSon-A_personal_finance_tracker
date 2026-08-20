import { View, Pressable} from 'react-native'
import TopUserComp from '../TopUserComp'
import { Plus} from 'lucide-react-native'
import ThemeIcon from '@/components/Theme/ThemeIcon'
import SearchBar from '@/components/Search/SearchBar'


const HeaderList = ({headingText,onPress,inlineText,setQuery,pressableNeeded}:HeaderListProps) => {

  return (
    <View className=' px-4 gap-y-4 pt-4'>
      <TopUserComp 
      otherText={true} 
        headingText={headingText}/>
        
        <View className='flex-row items-center gap-x-2'>
          <SearchBar
          onSearch={setQuery}
          inlineText={inlineText}/>
         {pressableNeeded && <Pressable
            className='addBtn borderOne'
            onPress={onPress}>
              <ThemeIcon
              icon={Plus}
              size={30}/>
            </Pressable>}
        </View>
      </View>
  )
}

export default HeaderList