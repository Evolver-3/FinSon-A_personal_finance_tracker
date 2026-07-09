import { View, Text,Pressable } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { getIconByName } from '../comps/Mode/ModalComp'
import BudgetSpentBar from '../comps/Animate/BudgetSpentBar'
import { ChevronLeft ,ChevronRight} from 'lucide-react-native'
import ThemeIcon from '../Theme/ThemeIcon'
import { useRouter } from 'expo-router'
import PressedAnimate from '../comps/Animate/PressedAnimate'
import { useTheme } from '@/hooks/useTheme'
import { formatAmount } from '@/app/(tabs)/home'


const RenderBudget = ({item}:{item:Budget}) => {
  const {isDark}=useTheme()
  const router=useRouter()

  const spentAmount=Number(item.spent)
  const remainingAmount=Number(item.remaining)

  const totalAmount=spentAmount+remainingAmount


  const perLeft=(remainingAmount/totalAmount *100).toPrecision(4)

  return (
    <View className='px-4'>
      <View className="rounded-xl py-6 px-4 mainbg mainborder flex-col gap-y-4"
      style={{
        backgroundColor:isDark?"#212121":item.category?.color.colors,
        elevation:2
      }}>

        <View className='flex-row justify-between  items-center'>
          <View className="flex-row gap-x-5 items-center">
            <View className='rounded-lg p-2'
            style={{
              backgroundColor:item.category?.color.darkColor,
              elevation:5
            }}>
              {getIconByName(item.category?.icon ?? null,false,isDark?"#000000":"#ffffff",24)}
            </View>

            <Text className=' text-md biggerText uppercase'
            style={{
              fontFamily:"Sans-Bold"
            }}>{item.category?.name}</Text>
          </View>

          {remainingAmount>totalAmount?(
              <Text className='bg-red-100 text-red-400 dark:bg-neutral-600 px-2 py-1 rounded-md text-xs font-semibold'>Over Budget</Text>
            ):(
              <Text className='bg-green-100 dark:bg-neutral-600 text-green-400 px-2 py-1 rounded-md text-xs font-semibold'>On Track</Text>
            )}
        </View>

        <View className="flex-row justify-between items-center">

          <View className="flex-col gap-y-1">
              <Text className="text-xs minText"
              style={{
                fontFamily:"Sans-Extrabold"
              }}>Remaining</Text>
              <Text className="text-green-400 text-md">{formatAmount(remainingAmount)}</Text>
          </View>

          <PressedAnimate
            style={{
            width:36,
            height:36,
            borderRadius:18,
            alignItems:"center",
            justifyContent:"center"
            }}
            originalColor={"transparent"}
            pressedColor={"rgba(99, 102, 241, 0.16)"}
            onPress={()=>{
              router.push({
                pathname:"/(usertab)/BudgetData",
                params:{
                  categoryId:item.categoryId,
                  month:String(item.month),
                  year:String(item.year),
                  budgetId:item.id
                }
              })
            }}>
              <ThemeIcon
            icon={ChevronRight}
            size={16}/>
          </PressedAnimate>

        </View>
        
      </View>
    </View>
  )
}

export default RenderBudget