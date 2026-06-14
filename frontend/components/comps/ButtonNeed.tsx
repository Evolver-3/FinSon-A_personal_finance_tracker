import {ActivityIndicator, Pressable,Text} from 'react-native'

type buttonNeedProps={
  onPress:()=>void
  text:string
  disabled:boolean
  loading:boolean
}

export const ButtonNeed=({onPress,text,disabled,loading}:buttonNeedProps)=>{
  return(
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor:`rgba(0,0,0,0.5)`,
        borderWidth:0,

      }}>
        <Text 
        style={{
          textAlign:"center",
          paddingHorizontal:6,
          paddingVertical:20,
          borderRadius:300,
          color:"#ffffff",
          backgroundColor:"#36C9D1",
        }}>
          {loading?<ActivityIndicator/> :text}
        </Text>
    </Pressable>
  )
}