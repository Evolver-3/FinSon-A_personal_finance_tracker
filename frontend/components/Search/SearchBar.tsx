import { View,TextInput} from 'react-native'
import React,{useState} from 'react'
import ThemeIcon from '../Theme/ThemeIcon'
import { Search } from 'lucide-react-native'
import { useTheme } from '@/hooks/useTheme'


const SearchBar = ({inlineText,onSearch}:SearchBarProps) => {
  const {isDark}=useTheme()
  const [searchNew,setSearchNew]=useState('')

  const handleSearch=(text:string)=>{
    setSearchNew(text)
    onSearch(text)
  }
  return (
    <View
      className='searchHead borderOne'>
        <ThemeIcon
        icon={Search}
        size={20}/>

        <TextInput
        className='smallText searchText'
        value={searchNew}
        onChangeText={handleSearch}
        placeholder={inlineText}
        placeholderClassName='smallText searchPlaceholderText'
        placeholderTextColor={isDark?"#ffffff":"#000000"}
        />
    </View>
  )
}

export default SearchBar