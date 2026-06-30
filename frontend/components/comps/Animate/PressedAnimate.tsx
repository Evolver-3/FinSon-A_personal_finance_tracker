import {Pressable,View} from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type pressedAnimateProps={
  onPress:()=>void
  children:React.ReactElement
}
const AnimatedPressable=Animated.createAnimatedComponent(Pressable)
const PressedAnimate = ({onPress,children}:pressedAnimateProps) => {

  const pressed=useSharedValue(0)
  
  const animatedStyle=useAnimatedStyle(()=>{
    return {
    backgroundColor:interpolateColor(
      pressed.value,
      [0,1],
      ["transparent","rgba(99, 102, 241, 0.16)"]
    ),
    transform:[
      {
        scale:withTiming(pressed.value? 0.94:1,{
          duration:120
        })
      }
    ]
  }
  })


  return (
    <AnimatedPressable
    onPress={onPress}
    onPressIn={()=>{
      pressed.value=withTiming(1)
    }}
    onPressOut={()=>{
      pressed.value=withTiming(0)
    }}
    
    style={[
      {
        width:36,
        height:36,
        borderRadius:18,
        alignItems:"center",
        justifyContent:"center"
      },
      animatedStyle
    ]}>

      {children}

    </AnimatedPressable>
  )
}

export default PressedAnimate