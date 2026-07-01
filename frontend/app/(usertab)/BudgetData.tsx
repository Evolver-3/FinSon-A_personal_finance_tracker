import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useTransaction } from '@/hooks/useTransaction'
import Wrapper from '@/components/WrapperPage'
import { useLocalSearchParams } from 'expo-router'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { ShowAmount } from '@/components/transactionPage/RenderTransaction'
import { getAccountIconByName, getIconByName } from '@/components/comps/Mode/ModalComp'


const BudgetData = () => {

  const {categoryId,month,year}=useLocalSearchParams<{ 
    categoryId:string 
    month:string
    year:string
  }>()

  const {transactions}=useTransaction()

  const budgetTransactions=transactions.filter(transaction=>{
    const date=new Date(transaction.date)

    console.log(transaction.category?.id,date.getMonth()+1, date.getFullYear())
    return (
      transaction.category?.id=== categoryId && date.getMonth()+1 === Number(month) && date.getFullYear()===Number(year)
    )
  })

  console.log("transactions:",transactions)
 
  console.log("budget data:",categoryId,month,year)

  console.log(budgetTransactions)
  return (
    <Wrapper loading={false}>
      <FlatList
      data={budgetTransactions}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{
        paddingHorizontal:4,
        paddingTop:6,
        gap:10
      }}
      ListHeaderComponent={
        <View className='flex-col gap-y-4 px-4 '>
          <Text className='biggerText font-semibold text-[24px] '>Check all transactions on your budget</Text>
        </View>
        }
      ListEmptyComponent={
        <View className='px-4'>
          <Text className="smallText">No Transaction</Text>
        </View>
        }
      renderItem={({item})=>(
            <View className='px-4'>
        
              <View className="rounded-md  py-6 px-4 mainbg mainborder flex-col gap-y-4"
              style={{
                elevation:2
              }}>

                <View>
                  <Text>Transaction details:</Text>

                  <View>
                    <Text className='smailltext'>{item.note}</Text>
                    <Text className='smailltext'>{item.title}</Text>
                    {getIconByName(item.category?.icon?? null,false)}
                  </View>
                </View>
          <Text className='smalltext'>Account: {item.account?.name}</Text>
          <Text>Type:{item.account?.type}</Text>
          {getAccountIconByName(item.account?.icon ?? null,false)}
          <Text className='smalltext'>{item.category?.name}</Text> 
          <Text className='smalltext'>{item.account?.balance}</Text>
          <ShowAmount
          item={item}/>
        </View>
        </View>
      )}
      />
    </Wrapper>
  )
}

export default BudgetData