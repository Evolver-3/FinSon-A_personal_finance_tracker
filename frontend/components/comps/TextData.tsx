import {View,TextInput,Text, KeyboardTypeOptions} from 'react-native'
type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
  secureTextEntry:boolean
  tagexist:boolean
  keyboardType:KeyboardTypeOptions
  
}

export const TextData=({tagexist,tag,value,placeholder,onChangeText,secureTextEntry,keyboardType}:dataProps)=>{
  return(

      <View className='flex gap-y-4'>
        {tagexist &&(
          <Text className='text-lg font-semibold smallText '>{tag}</Text>
        )}
        <TextInput
        className='rounded-xl mainbg p-5 text-md smallText mainBorder'
        style={{
          shadowColor:"#000",
          shadowOffset:{
            width:1,
            height:1
          },
          shadowOpacity:0.25,
          shadowRadius:5,
          elevation:10
        }}
        placeholderTextColor={"#6D6664"}
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}/>
      </View>

  )
}