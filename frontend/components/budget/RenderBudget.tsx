import { View, Text,Pressable } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { getIconByName } from '../comps/Mode/ModalComp'
import BudgetSpentBar from '../comps/Animate/BudgetSpentBar'
import { ChevronLeft ,ChevronRight} from 'lucide-react-native'
import ThemeIcon from '../Theme/ThemeIcon'
import { router } from 'expo-router'
import PressedAnimate from '../comps/Animate/PressedAnimate'


type renderBudgetProps={
  item:Budget 
  spendingBudget:(month:number,year:number)=>Promise<void>
}


const RenderBudget = ({item,spendingBudget}:renderBudgetProps) => {
  const [checkTransaction,setCheckTransaction]=useState(false)

  const spentAmount=Number(item.spent)
  const remainingAmount=Number(item.remaining)

  const totalAmount=spentAmount+remainingAmount


  const perLeft=(remainingAmount/totalAmount *100).toPrecision(4)

  return (
    <View className='px-4'>

      <View className="rounded-xl py-6 px-4 mainbg mainborder flex-col gap-y-4"
      style={{
        elevation:2
      }}>

        <View className='flex-row justify-between  items-center'>

          <View className="flex-row gap-x-5">
            <View className='rounded-lg p-2'
            style={{
              backgroundColor:item.category?.color.darkColor
            }}>
             
              {getIconByName(item.category?.icon ?? null,false,"#000000",20)}
            </View>

            <Text className='font-semibold text-xl biggerText'>{item.category?.name}</Text>
          </View>

          {
            remainingAmount>totalAmount?(
              <Text className='bg-red-100 text-red-400 px-2 py-1 rounded-xl text-xs font-semibold'>Over Budget</Text>
            ):(
              <Text className='bg-green-100 text-green-400 px-2 py-1 rounded-xl text-xs font-semibold'>On Track</Text>
            )
          }

        </View>

        <View className="">
          <View className="flex-row justify-between">
            <Text className='text-sm textSmall'>
              {spentAmount} spent of {totalAmount}
            </Text>
            <Text className="text-sm font-semibold textSmall">{perLeft}%</Text>
          </View>

          <View className="">
            <BudgetSpentBar
            spent={spentAmount}
            total={totalAmount}
            />
          </View> 
        </View>
        
          <View
          className="h-px mainborder "/>

          <View className="flex-row justify-between items-center">

            <View className="flex-col gap-y-1">
              <Text className="text-xs font-semibold biggerText">Remaining</Text>
              <Text className="text-green-400 text-md">{remainingAmount}</Text>
            </View>

            <PressedAnimate
            onPress={()=>{
              router.push({
                pathname:"/(usertab)/BudgetData",
                params:{
                  categoryId:item.categoryId,
                  month:String(item.month),
                  year:String(item.year)
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