import { View, Text,ScrollView,Pressable} from 'react-native'
import React,{useCallback, useEffect, useMemo} from 'react'
import { useAccount } from '@/hooks/useAccount'
import Wrapper from '@/components/mainUi/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { useBudget } from '@/hooks/useBudget'
import { FlatList } from 'react-native'
import { getAccountIconByName, getIconByName } from '@/components/comps/Mode/ModalComp'
import { useTransaction } from '@/hooks/useTransaction'
import PressedAnimate from '@/components/comps/Animate/PressedAnimate'
import { useFocusEffect, useRouter } from 'expo-router'
import { useTheme } from '@/hooks/useTheme'
import BudgetSpentBar from '@/components/comps/Animate/BudgetSpentBar'
import { FakeLoad } from '@/components/comps/Animate/FakeLoad'
import { formatAmount, formatDate } from '@/components/comps/DateFormat'
import { useUser } from '@/hooks/useUser'
import { useCurrency } from '@/context/CurrencyContext'
import ThemeIcon from '@/components/Theme/ThemeIcon'

const index = () => {

  const {backendUser}=useUser()
   const {fetchAllAccounts,accounts,loading}=useAccount()
   const {budgets,spendingBudget}=useBudget()
   const {getByYear,transactionsYearly}=useTransaction()
   const router=useRouter()

   const {isDark}=useTheme()
   const {symbol}=useCurrency()

     useEffect(()=>{

      const year=new Date().getFullYear()
      getByYear(year)
      console.log(transactionsYearly.months)
      console.log(transactionFilteredData)
     },[])

    useFocusEffect(
      useCallback(()=>{
        const now=new Date()
        spendingBudget(now.getMonth()+1, now.getFullYear(),'')
      },[])
    )


    const totalBalance=accounts.reduce((total,account)=>{
      return total+Number(account.balance)
    },0)

    const transactionFilteredData=useMemo(()=>{
      return transactionsYearly.months.flatMap(m=>m.transactions).sort((a,b)=>new Date(b.createdAt ?? 0).getTime()-new Date(a.createdAt?? 0).getTime()).slice(0,3)
    },[transactionsYearly.months])  


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
      otherText={false}
      >
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
              
              <View>
                <ThemeIcon icon={symbol} size={20}/>
              <Text className=' text-3xl text-green-500'
              style={{
                fontFamily:"Sans-Bold"
              }}>{formatAmount(totalBalance? totalBalance: 0)}</Text>
              </View>

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
                        pathname:"/(usertab)/ProfilePage/AccountPage",
                      })}}>
                     <View className="flex-row justify-between gap-x-4 items-center">
                    <View
                       className='p-2 items-center rounded-lg '
                       style={{
                         elevation:5,
                         backgroundColor:acc?.color?.darkColor
                       }}>
                         {getAccountIconByName(acc.icon || null,false,isDark?"#000000":"#ffffff",24)}
                     </View>

                     <Text className=' biggerText'
                     style={{
                      color:acc?.color?.btncolor,
                      fontFamily:"Sans-Bold"
                     }}>{acc.type}</Text>
                   </View>
                  
                   <View>
                     <Text className='smallText text-md'
                      style={{
                        fontFamily:"Sans-Semibold"
                      }}>{acc.name}</Text>

                      <View>
                        <ThemeIcon icon={symbol} size={20}/>

                        <Text className="text-green-400 text-lg font-semibold"
                     style={{
                    fontFamily:"Sans-Bold"
                    }}
                    >{formatAmount(acc.balance || 0)}</Text>
                      </View>
                     
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

                      <View>
                        <ThemeIcon icon={symbol} size={20}/>
                        <Text className='biggerText text-sm'>{formatAmount(Number(budget.spent))}/</Text>
                      </View>
                      
                        <ThemeIcon icon={symbol} size={20}/>
                        <Text>
                        {formatAmount(Number(budget.amount)) }</Text>

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
                      color={budget?.category?.color?.darkColor}/>

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
                        pathname:"/(usertab)/Transactions",
                      })}}>
                     <Text className='text-sm text-blue-700'
                     style={{
                      fontFamily:"Sans-Bold"
                     }}>VIEW ALL</Text>
              </PressedAnimate>
            </View>
          </View>
        }
        ListEmptyComponent={
          <FakeLoad 
            loading={isInitiallyLoading}
            hasData={transactionFilteredData.length>0}
            unmatchText='No transactions found'
            defaultText='Add a transaction'>
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
                      backgroundColor:item?.category?.color?.darkColor
                    }}>
                {getIconByName(item.category?.icon ?? null,false,isDark?"#000000":"#ffffff",24)}
              </View>

              <View className='gap-y-2'>
                <Text className="smallText font-semibold uppercase">{item.title}</Text>
                <Text className='text-xs minText'
                style={{
                  fontFamily:"Sans-ExtraBold"
                }}>{formatDate(String(item.date))}</Text>
              </View>
            </View>

              {item.type==="EXPENSE" ? (
                <View><ThemeIcon icon={symbol} size={20}/>
                <Text className="font-semibold text-xl biggerText  text-red-400 dark:text-red-400 "
                >{formatAmount(item.amount)}</Text></View>
              ):(
                <View><ThemeIcon icon={symbol} size={20}/>
                <Text className="font-semibold text-sm biggerText  text-green-400 px-2 py-1 rounded-lg bg-green-100  dark:bg-gray-600">{symbol}{formatAmount(item.amount)}</Text>
                </View>
              )}
             
          </View>
        )}

        />
       

      </View>
    </Wrapper>
  ) 
}

export default index


