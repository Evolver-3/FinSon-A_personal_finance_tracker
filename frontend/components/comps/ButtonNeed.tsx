import {ActivityIndicator, Pressable,StyleProp,Text, ViewStyle} from 'react-native'

type buttonNeedProps={
  onPress:()=>void
  text:string
  disabled:boolean
  loading:boolean
  style:StyleProp<ViewStyle>
}

export const ButtonNeed=({onPress,text,disabled,loading,style}:buttonNeedProps)=>{
  return(
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed})=>({
        backgroundColor:`rgba(100,20,10,0.5)`,
        borderRadius:300,
        shadowColor:"#36C9D1",
        shadowOffset:{width:0, height:pressed? 1:4},
        shadowOpacity:pressed?0.1:0.4,
        shadowRadius:pressed?1:8,
        elevation:pressed?2:8,
        transform:[{scale:pressed?0.98:1}],
        style
      })}>
        <Text 
        style={{
          textAlign:"center",
          paddingHorizontal:6,
          paddingVertical:20,
          borderRadius:300,
          color:"#ffffff",
          backgroundColor:"#36C9D1",
          opacity:disabled?0.6:1
          
        }}>
          {loading?<ActivityIndicator color="#fff"/> :text}
        </Text>
    </Pressable>
  )
}