import {Pressable,View, ViewStyle} from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type pressedAnimateProps={
  onPress:()=>void
  children:React.ReactElement,
  pressedColor:string
  originalColor:string
  style:ViewStyle
}
const AnimatedPressable=Animated.createAnimatedComponent(Pressable)
const PressedAnimate = ({onPress,children,pressedColor,originalColor,style}:pressedAnimateProps) => {

  const pressed=useSharedValue(0)
  
  const animatedStyle=useAnimatedStyle(()=>{
    return {
    backgroundColor:interpolateColor(
      pressed.value,
      [0,1],
      [originalColor,pressedColor]
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
        alignItems:"center",
        justifyContent:"center"
      },
      animatedStyle,
      style
    ]}>
      {children}

    </AnimatedPressable>
  )
}

export default PressedAnimate