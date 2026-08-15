import { View, Text ,FlatList} from 'react-native'
import React, { useCallback, useState } from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import { useBudget } from '@/hooks/useBudget'
import CreateBudget from '@/components/budget/CreateBudget'
import { useCategory } from '@/hooks/useCategory'
import RenderBudget from '@/components/budget/RenderBudget'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { monthData } from '@/data'
import {FakeLoad} from '@/components/comps/Animate/FakeLoad'
import { useTheme } from '@/hooks/useTheme'
import { useFocusEffect } from 'expo-router'
import { useCurrency } from '@/context/CurrencyContext'
import { formatAmount } from '@/components/comps/DateFormat'
import ThemeIcon from '@/components/Theme/ThemeIcon'


const Budget = () => {

  const {creatingNewBudget,loading,budgets,spendingBudget}=useBudget()
  const {categories}=useCategory()
  const [pageError,setPageError]=useState("")
  const [pageLoad,setPageLoad]=useState(false)
  const [query,setQuery]=useState('')
  const [openModal,setOpenModal]=useState(false)

  const {isDark}=useTheme()
  const {symbol}=useCurrency()
 useFocusEffect(
       useCallback(()=>{
         const now=new Date()
         spendingBudget(now.getMonth()+1, now.getFullYear())
       },[])
     )
 

  const isInitiallyLoading=loading && budgets.length===0

  const monthlyBudget=(monthNumber:number)=>{
    return monthData.find((item)=>Number(item.id)===monthNumber)?.month ?? ""
  }

   const filteredData=budgets.filter(item=>{
    const searchable=monthlyBudget(item.month) ?? String(item.year)
    return searchable.toLowerCase().includes(query.toLowerCase())
  })

  const getRemainingPerMonth=budgets.reduce((total,item)=>{
      return total+ Number(item.remaining??0)
    },0)

  const getSpendPerMonth=budgets.reduce((total,item)=>{
    return total+Number(item.spent ??0)
  },0)

  const getTotalPerMonth=budgets.reduce((total,item)=>{
    return total+Number(item.amount ?? 0)
  },0)
    
    return (
    <Wrapper loading={false}>
  
      <CreateBudget
      creatingNewBudget={creatingNewBudget}
      loading={loading}
      categories={categories}
      pageLoad={pageLoad}
      setPageLoad={setPageLoad}
      setPageError={setPageError}
      pageError={pageError}
      pressableFlex={2}
      viewFlex={6}
      openModal={openModal}
      setOpenModal={setOpenModal}/>

      <FlatList
      data={filteredData}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{
        paddingHorizontal:4,
        paddingTop:6,
        gap:10
      }}
      ListHeaderComponent={
        <View className='flex-col gap-y-4'>
          <HeaderList 
          pressableNeeded
          setQuery={setQuery}
          headingText={'Add your monthly Budgets'}
          inlineText={"Search Budgets..."}
          onPress={()=>setOpenModal(true)}/>
          
          <View className="px-4 mb-4">
            <View className="boxBlock mainborder"
          style={{
            gap:6,
            elevation:2
          }}>
            <Text className='smallText text-md'
              style={{
                fontFamily:"Sans-Semibold"
              }}>Monthly{"  "}Budget{"  "}Remains</Text>

            <View className='flex-row gap-x-2 items-end'>
              <ThemeIcon icon={symbol} size={20}/>
              <Text className=' text-3xl text-green-500'
              style={{
                fontFamily:"Sans-Bold"
              }}>{formatAmount(getRemainingPerMonth)}</Text> 
              <View className=' smallText text-xs '
              >
                <Text>remains of</Text>
                <ThemeIcon icon={symbol} size={20}/>
                <Text>{formatAmount(getTotalPerMonth)}</Text> 
              </View>
            </View>
          </View>
          </View>
        </View>
        }
      ListEmptyComponent={
        <FakeLoad 
          loading={isInitiallyLoading}
          hasData={budgets.length>0}
          query={query}
          unmatchText='No matching budget found'
          defaultText='Add an budget'>
            {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
              <View key={item}
                className='w-full h-40 rounded-md'
                style={{
                  backgroundColor:isDark?"#857A83":"#E3C1DE"
                  }}>
              </View>
            ))}
        </FakeLoad>
        }
      renderItem={({item})=>(
        <RenderBudget
        item={item}
        symbol={symbol}/>
      )}
      />
    </Wrapper>
  )
}

export default Budget