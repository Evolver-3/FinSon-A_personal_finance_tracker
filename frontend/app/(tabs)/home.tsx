import { View, Text,ScrollView,Pressable} from 'react-native'
import React,{useEffect} from 'react'
import { useAccount } from '@/hooks/useAccount'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { useBudget } from '@/hooks/useBudget'
import { FlatList } from 'react-native'
import { getAccountIconByName, getIconByName } from '@/components/comps/Mode/ModalComp'
import { useTransaction } from '@/hooks/useTransaction'
import PressedAnimate from '@/components/comps/Animate/PressedAnimate'
import { useRouter } from 'expo-router'
import { useTheme } from '@/hooks/useTheme'
import BudgetSpentBar from '@/components/comps/Animate/BudgetSpentBar'
const index = () => {

   const {fetchAllAccounts,accounts,loading}=useAccount()
   const {budgets}=useBudget()
   const {transactions}=useTransaction()
   const router=useRouter()

   const {isDark}=useTheme()
    useEffect(()=>{
  
      fetchAllAccounts()

    },[])
  
    const totalBalance=accounts.reduce((total,account)=>{
      return total+Number(account.balance)
    },0)

     const getExpensePerMonth=budgets.reduce((total,item)=>{
    return total+Number(item.spent ??0)
    },0)

    const getRemainPerMonth=budgets.reduce((total,item)=>{
      return total+Number(item.remaining ??0)
    },0)

    const transactionFilteredData=[...(transactions ?? [])]?.sort((a,b)=>new Date(b.createdAt ?? 0).getTime()- new Date(a.createdAt ?? 0).getTime()).slice(0,3)

    const percentageBudget=({remain,total}:{remain:number,total:number})=>{

      if(!total) return 0;
      return (remain/total)*100;
    }

  return (
    <Wrapper loading={false}>
       <View className='boxInnerSize'>
      <TopUserComp
      headingText={`Hello User`}/>
    
      <View className="">
        <FlatList
        data={transactionFilteredData}
        keyExtractor={(item)=>item.id}
        ListHeaderComponent={
          <View className='gap-y-5 mb-5'>

            <View className='boxBlock'>
              <Text className='smallText text-xs'>TOTAL BALANCE</Text>
              <Text className='biggerText text-3xl'>{totalBalance? totalBalance :0}</Text>

            </View>

            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap:8,
            }}>
              {accounts.map((acc)=>(
                <PressedAnimate
                key={acc.id}
                  style={{
                    width:190
                  }}
                  className=" flex-col gap-y-3 rounded-xl p-4 border border-slate-100 dark:border-slate-900" 
                  originalColor={isDark?"#000000":"#ffffff"}
                  pressedColor={"#EBF2F2"}
                  onPress={()=>{
                    router.push({
                        pathname:"/(usertab)/AccountPage",
                      })}}>
                     <View className="flex-row justify-between gap-x-4 items-center">
                    <View
                       className='p-2 items-center rounded-lg '
                       style={{
                         elevation:5,
                         backgroundColor:acc.color.darkColor
                       }}>
                         {getAccountIconByName(acc.icon,false,"#000000")}
                     </View>

                     <Text className='text-lg font-semibold biggerText'>{acc.type}</Text>
                   </View>
                  
                   <View>
                     <Text className='smallText text-md'>{acc.name}</Text>
                     <Text className="biggerText text-lg font-semibold">{acc.balance}</Text>
                   </View>
                </PressedAnimate>
              ))}
            </ScrollView>

            <View className="boxBlock gap-y-2">
              <View className='justify-between flex-row'>
                <Text className="text-lg font-semibold biggerText">Monthly Budget</Text>

                <PressedAnimate
                  style={{
                    width:80,
                    height:36,
                    borderRadius:4,
                    paddingVertical:4,
                    paddingHorizontal:2,
                    alignItems:"center",
                    justifyContent:"center"
                    
                  }}
                  originalColor={"transparent"}
                  pressedColor={"rgba(99, 102, 241, 0.16)"}
                  onPress={()=>{
                    router.push({
                        pathname:"/(tabs)/Budget",
                      })}}>
                     <Text className='text-sm font-semibold text-blue-700'>VIEW ALL</Text>
                </PressedAnimate>
                
              </View>

              <View className='gap-y-6'>
                {budgets.map((budget)=>(
                  <View key={budget.id}
                  className='gap-y-3 '>
                    <Text className='smallText font-bold uppercase text-md'>{budget.category?.name}</Text>

                    <View className='flex-row justify-between'>
                      <Text className='biggerText text-sm'>{Number(budget.spent)}/{Number(budget.amount) }</Text>

                      <Text className='text-xs '>
                        {percentageBudget(
                        {remain:Number(budget?.remaining),
                        total:Number(budget?.amount)
                        })} %</Text>
                    </View>

                    <BudgetSpentBar
                      spent={Number(budget.spent??0)}
                      total={budget.amount}
                      color={budget.category?.color.darkColor}/>

                  </View>
                ))}
              </View>
            </View>

            <Text className="text-lg font-semibold biggerText">Recent Transactions</Text>
          </View>
        }
        ListEmptyComponent={
          <View>
          </View>
        }
        ItemSeparatorComponent={()=>
          <View style={{
            height:12
          }}/>
        }

        renderItem={({item})=>(
          <View className="boxBlock flex-row justify-between items-center">
            <View className="flex-row gap-x-5 items-center">

              <View
              className='p-2 items-center rounded-lg'
              style={{
                      elevation:5,
                      backgroundColor:item.category?.color.darkColor
                    }}>
                {getIconByName(item.category?.icon ?? null,false,"#000000",20)}
              </View>

              <Text className="smallText font-semibold">{item.title}</Text>
            </View>

            <View className="">
              <Text className="font-semibold text-xl biggerText">{item.amount}</Text>
              <Text></Text>
            </View>
            

          </View>
        )}
        />
       

      </View>
    </View>

    </Wrapper>
  ) 
}

export default index