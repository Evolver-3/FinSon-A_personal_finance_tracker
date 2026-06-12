import {View,TextInput,Text} from 'react-native'
type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
  secureTextEntry:boolean
  tagexist:boolean
  
}

export const TextData=({tagexist,tag,value,placeholder,onChangeText,secureTextEntry}:dataProps)=>{
  return(

      <View className='flex gap-y-4'>
        {tagexist &&(
          <Text className='text-lg font-semibold text-neutral-400 text-dm '>{tag}</Text>
        )}
        <TextInput
        className='rounded-xl bg-neutral-900 p-5 text-md text-neutral-200 border border-neutral-700 '
        style={{
          shadowColor:"#000",
          shadowOffset:{
            width:0,
            height:4
          },
          shadowOpacity:0.25,
          shadowRadius:5,
          elevation:8
        }}
        placeholderTextColor={"#6D6664"}
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}/>
      </View>

  )
}