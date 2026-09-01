import { View, Text } from 'react-native'
import { getIconByName } from '../comps/Mode/ModalComp'
import { ChevronRight} from 'lucide-react-native'
import ThemeIcon from '../Theme/ThemeIcon'
import { useRouter } from 'expo-router'
import PressedAnimate from '../comps/Animate/PressedAnimate'
import { useTheme } from '@/hooks/useTheme'
import { formatAmount } from '@/components/comps/DateFormat'
import {useAuth as useClerkAuth} from '@clerk/clerk-expo'

const RenderBudget = ({item,symbol}:{item:Budget,symbol:any}) => {
  const {isDark}=useTheme()
  const router=useRouter()
  const {isSignedIn}=useClerkAuth()
  const isGuest=!isSignedIn

  const spentAmount=Number(item.spent)
  const remainingAmount=isGuest?Number(item.amount-spentAmount):Number(item.remaining)

  const totalAmount=spentAmount+remainingAmount
  const perLeft=(remainingAmount/totalAmount *100).toPrecision(4)


  const handlePress=()=>{
    try{
      router.push({
        pathname:"/(usertab)/BudgetData",
        params:{
          categoryId:item.categoryId,
          month:String(item.month),
          year:String(item.year),
          budgetId:item.id,
          symbol:item.category?.icon
        }
      })
      // console.log("router.push called successfully")

    }catch(error:any){
      console.log("router push error:", error)

    }
  }

  return (
    <View className='px-4'>
      <View className="rounded-xl py-6 px-4 mainbg mainborder flex-col gap-y-4"
      style={{
        backgroundColor:isDark?"#212121":item?.category?.color?.colors,
        elevation:2
      }}>

        <View className='flex-row justify-between  items-center'>
          <View className="flex-row gap-x-5 items-center">
            <View className='rounded-lg p-2'
            style={{
              backgroundColor:item.category?.color?.darkColor,
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
              <View>
              <ThemeIcon icon={symbol} size={20}/>
              <Text className="text-green-400 text-md">{formatAmount(remainingAmount)}</Text>
              </View>
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
            onPress={handlePress}>
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