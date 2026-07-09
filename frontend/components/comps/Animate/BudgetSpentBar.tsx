import { View } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import Animated,{useAnimatedStyle,useSharedValue,withTiming,Easing} from 'react-native-reanimated'

type budgetSpentBarProps={
  spent:number 
  total:number 
  color?: string
}
const BudgetSpentBar = ({spent=10,total=100,color="#36C9D1"}:budgetSpentBarProps) => {
  const {isDark}=useTheme()

  const percentage=total>0 ? Math.min((spent/total)*100,100):0
  const overBudget=spent>total;;

  const progress=useSharedValue(0)

  useEffect(()=>{
    progress.value=0;

    progress.value=withTiming(percentage,{
      duration:700,
      easing:Easing.out(Easing.cubic)
    })
  },[percentage])

  const animatedStyle=useAnimatedStyle(()=>{
    return{
      width:`${progress.value}%`
    }
  })
  return (
    <View
    style={{
      gap:4
    }}>

      <View style={{
        height:10,
        backgroundColor:isDark?'#000000':"#EBF2F2",
        borderRadius:999,
        overflow:"hidden"
      }}>
        <Animated.View style={[
          { 
          height:10,
          borderRadius:999,
          backgroundColor:overBudget?"#ef4444":color,
          width:`${percentage}%`
        },animatedStyle
        ]}/>
      </View>
      
    </View>
  )
}

export default BudgetSpentBar