import { View,Pressable, ViewStyle, StyleProp} from 'react-native'
import Animated,{LinearTransition,FadeIn,FadeOut} from 'react-native-reanimated'
import React,{useRef,useState} from 'react'

type animatedDropProps={
  style?:StyleProp<ViewStyle>
  secStyle?:StyleProp<ViewStyle>
  firstChild:React.ReactNode
  secChild:React.ReactNode
  viewstyle?:StyleProp<ViewStyle>
}
const Animateddrop = ({style,firstChild,secStyle,secChild,viewstyle}:animatedDropProps) => {
  const [expanded,setExpanded]=useState(false)
 
  
  return (
  <Animated.View
  layout={LinearTransition.duration(250)}
  className="rounded-xl p-3 mainborder"
  style={viewstyle}>
   <Pressable
   onPress={()=>setExpanded((prev)=>!prev)} 
   style={style}>
    {firstChild}

   </Pressable>

   {expanded && (
    <Animated.View
   style={secStyle}
   entering={FadeIn.duration(200)}
   exiting={FadeIn.duration(150)}>
      {secChild}
   </Animated.View>
   )}
  </Animated.View>
  )
}

export default Animateddrop