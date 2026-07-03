import { View,TextInput} from 'react-native'
import React,{useState} from 'react'
import ThemeIcon from '../Theme/ThemeIcon'
import { Search } from 'lucide-react-native'
import { useTheme } from '@/hooks/useTheme'

type SearchBarProps={
  inlineText:string
  onSearch:(query:string)=>void
}

const SearchBar = ({inlineText,onSearch}:SearchBarProps) => {
  const {isDark}=useTheme()
  const [searchNew,setSearchNew]=useState('')

  const handleSearch=(text:string)=>{
    setSearchNew(text)
    onSearch(text)
  }
  return (
    <View
      className='flex-row items-center border border-slate-400 dark:border-neutral-500 rounded-lg px-2  gap-x-4 flex-grow'>
        <ThemeIcon
        icon={Search}
        size={20}/>

        <TextInput
        className='text-sm smallText font-extralight'
        value={searchNew}
        onChangeText={handleSearch}
        placeholder={inlineText}
        placeholderClassName='text-sm smallText font-extralight'
        placeholderTextColor={isDark?"#ffffff":"#000000"}
        />
    </View>
  )
}

export default SearchBar