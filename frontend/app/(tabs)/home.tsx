import { View, Text,ScrollView,Pressable} from 'react-native'
import React,{useCallback, useEffect} from 'react'
import { useAccount } from '@/hooks/useAccount'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { useBudget } from '@/hooks/useBudget'
import { FlatList } from 'react-native'
import { getAccountIconByName, getIconByName } from '@/components/comps/Mode/ModalComp'
import { useTransaction } from '@/hooks/useTransaction'
import PressedAnimate from '@/components/comps/Animate/PressedAnimate'
import { useFocusEffect, useRouter } from 'expo-router'
import { useTheme } from '@/hooks/useTheme'
import BudgetSpentBar from '@/components/comps/Animate/BudgetSpentBar'
import { FakeLoad } from '../(usertab)/AccountPage'
import { formatDate } from '@/components/comps/DateFormat'
import { useUser } from '@/hooks/useUser'

const index = () => {

  const {user}=useUser()
   const {fetchAllAccounts,accounts,loading}=useAccount()
   const {budgets,spendingBudget}=useBudget()
   const {transactions,fetchAllTransactions}=useTransaction()
   const router=useRouter()

   const {isDark}=useTheme()


    useEffect(()=>{
  
      fetchAllAccounts()

    },[])

    useFocusEffect(
      useCallback(()=>{
        const now=new Date()
        spendingBudget(now.getMonth()+1, now.getFullYear())
      },[])
    )

    useFocusEffect(
      useCallback(()=>{
        fetchAllTransactions()
      },[])
    )
  
    const totalBalance=accounts.reduce((total,account)=>{
      return total+Number(account.balance)
    },0)

    const transactionFilteredData=[...(transactions ?? [])]?.sort((a,b)=>new Date(b.createdAt ?? 0).getTime()- new Date(a.createdAt ?? 0).getTime()).slice(0,3)

    const budgetFilteredData=[...(budgets ?? [])]?.sort((a,b)=>new Date(b.createdAt ?? 0).getTime()-new Date(a.createdAt ?? 0).getTime()).slice(0,3)

    const percentageBudget=({remain,total}:{remain:number,total:number})=>{

      if(!total) return 0;
      return (remain/total)*100;
    }

    const isInitiallyLoading=loading && transactionFilteredData.length===0

  return (
    <Wrapper loading={false}>
       <View className='boxInnerSize flex-1'>
      <TopUserComp
      >
        <Text className="biggerText text-xl"
        style={{
                fontFamily:"Sans-Extrabold"
              }}
        >Welcome {user?.name}</Text>
      </TopUserComp>
    

        <FlatList
        className='flex-1'
        data={transactionFilteredData}
        keyExtractor={(item)=>item.id}
        ListHeaderComponent={
          <View className='gap-y-5 mb-5'>
        
            <View className='boxBlock mainborder'
            style={{
              gap:4,
              elevation:2
            }}>
              <Text className='smallText text-xs'
              style={{
                fontFamily:"Sans-Semibold"
              }}
              >TOTAL{"  "}BALANCE</Text>
              
              <Text className=' text-3xl text-green-500'
              style={{
                fontFamily:"Sans-Bold"
              }}>{formatAmount(totalBalance? totalBalance: 0)}</Text>

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
                    width:180
                  }}
                  className=" flex-col gap-y-3 rounded-xl p-4 border border-slate-100 dark:border-neutral-700" 
                  originalColor={isDark?"#212121":"#ffffff"}
                  pressedColor={isDark?"#393939":"#EBF2F2"}
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
                         {getAccountIconByName(acc.icon,false,isDark?"#000000":"#ffffff",24)}
                     </View>

                     <Text className=' biggerText'
                     style={{
                      color:acc.color.btncolor,
                      fontFamily:"Sans-Bold"
                     }}>{acc.type}</Text>
                   </View>
                  
                   <View>
                     <Text className='smallText text-md'
                      style={{
                        fontFamily:"Sans-Semibold"
                      }}>{acc.name}</Text>
                     <Text className="text-green-400 text-lg font-semibold"
                     style={{
                    fontFamily:"Sans-Bold"
                    }}
                    >{formatAmount(acc.balance)}</Text>
                   </View>
                </PressedAnimate>
              ))}
            </ScrollView>

            <View className='justify-between flex-row items-center'>

                <Text className="text-md biggerText"
                style={{
                fontFamily:"Sans-Bold"
                }}>
                  Monthly{"  "}Budget
                </Text>

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
                     <Text className='text-xs text-blue-700'
                     style={{
                      fontFamily:"Sans-Bold"
                     }}>VIEW ALL</Text>
                </PressedAnimate>
                
            </View>

            <View className="boxBlock">
              
              <View className='gap-y-7'>
                {budgetFilteredData.map((budget)=>(
                  <View key={budget.id}
                  className='gap-y-2 '>
                    <Text className='smallText  uppercase text-md'
                    style={{
                      fontFamily:"Sans-Bold"
                    }}>{budget.category?.name}</Text>

                    <View className='flex-row justify-between'>
                      <Text className='biggerText text-sm'>{formatAmount(Number(budget.spent))}/{formatAmount(Number(budget.amount)) }</Text>

                      <Text className='text-xs text-green-600 dark:text-green-500'
                      style={{
                        fontFamily:"Sans-Bold"
                      }}>
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

            <View className='justify-between flex-row items-center'>
              <Text className="text-md biggerText"
                style={{
                fontFamily:"Sans-Bold"
                }}>
                  Recent{"  "}Transactions
              </Text>

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
                        pathname:"/(tabs)/Transactions",
                      })}}>
                     <Text className='text-sm font-semibold text-blue-700'>VIEW ALL</Text>
              </PressedAnimate>
            </View>
          </View>
        }
        ListEmptyComponent={
          <FakeLoad 
            loading={isInitiallyLoading}
            hasAccounts={transactionFilteredData.length>0}
            unmatchText='No matching budget found'
            defaultText='Add an budget'>
            {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
              <View
                key={item}
                className='w-full h-40 rounded-md'
                style={{
                      backgroundColor:isDark?"#857A83":"#E3C1DE"
                    }}>
              </View>
            ))}
          </FakeLoad>
        }
        ItemSeparatorComponent={()=>
          <View style={{
            height:5
          }}/>
        }

        contentContainerStyle={{
          paddingBottom:70
        }}
        showsVerticalScrollIndicator={false}

        renderItem={({item})=>(
          <View className="boxBlock flex-row justify-between items-center">
            <View className="flex-row gap-x-5 items-center">
              <View
              className='p-2 items-center rounded-lg'
              style={{ 
                      elevation:5,
                      backgroundColor:item.category?.color.darkColor
                    }}>
                {getIconByName(item.category?.icon ?? null,false,isDark?"#000000":"#ffffff",24)}
              </View>

              <View className='gap-y-2'>
                <Text className="smallText font-semibold uppercase">{item.title}</Text>
                <Text className='text-xs minText'
                style={{
                  fontFamily:"Sans-ExtraBold"
                }}>{formatDate(item.date)}</Text>
              </View>
            </View>

              {item.type==="EXPENSE" ? (
                <Text className="font-semibold text-xl biggerText  text-red-400 dark:text-red-400 "
                >-{formatAmount(item.amount)}</Text>
              ):(
                <Text className="font-semibold text-sm biggerText  text-green-400 px-2 py-1 rounded-lg bg-green-100  dark:bg-gray-600">+{formatAmount(item.amount)}</Text>
              )}
             
          </View>
        )}

        />
       

    </View>

    </Wrapper>
  ) 
}

export default index


export const formatAmount=(amount:Number | string)=>{
  return Number(amount).toLocaleString("en-IN");
}