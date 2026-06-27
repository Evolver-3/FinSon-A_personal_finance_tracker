import { useTheme } from '@/hooks/useTheme'
import {View,TextInput,Text, KeyboardTypeOptions} from 'react-native'
type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
  secureTextEntry:boolean
  tagexist:boolean
  keyboardType:KeyboardTypeOptions
  errorType?:boolean
  
}

export const TextData=({tagexist,tag,value,placeholder,onChangeText,secureTextEntry,keyboardType,errorType}:dataProps)=>{
  const {isDark}=useTheme()
  return(

      <View className='flex gap-y-4'
      style={{
        
      }}>
        <View>
        {tagexist &&(
          <Text className='text-lg font-semibold smallText '>{tag}</Text>
        )}
        </View>

        <View style={{
          position:"relative",
          overflow:"hidden",
          borderRadius:0,
          padding:2
        }}>
          <View
          style={{
            position:"absolute",
            top:0,
            left:0,
            right:0,
            bottom:0,
            borderRadius:14,
            borderWidth:1,
          borderColor:errorType?"#C73434":"#8C8585",
          backgroundColor:isDark?"#524B52":"#241E24"

          }}/>
          <TextInput
        className=' mainbg p-4 text-md smallText'
        style={{
          borderRadius:12
          
        }}
        placeholderTextColor={ isDark?"#C1C4C8":"#66696B"}
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}/>
        </View>
      </View>

  )
}