import { View, Text , FlatList, SectionList} from 'react-native'
import React, { useCallback, useEffect, useState ,useMemo} from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import { useTransaction } from '@/hooks/useTransaction'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import HeaderList from '@/components/comps/Flat/HeaderList'
import RenderTransaction from '@/components/transactionPage/RenderTransaction'
import { FakeLoad } from '../(usertab)/AccountPage'
import { useTheme } from '@/hooks/useTheme'
import { useFocusEffect } from 'expo-router'
import { formatMonth } from '@/components/comps/DateFormat'

const Transactions = () => {
  const {transactionsYearly,editTransaction,removeTransaction,fetchTransaction,loading,getByYear}=useTransaction()

  const year=Number(new Date().getFullYear())
  const month=Number(new Date().getMonth()+1)

   useFocusEffect(
    useCallback(()=>{
        getByYear(year)
      },[year])
    )


  const {accounts}=useAccount()
  const {categories}=useCategory()
  const [query,setQuery]=useState('')

  const currentMonth=useMemo(()=>{
    return transactionsYearly.months.find(m=>m.month === month)
  },[transactionsYearly.months, month])

  const sections=useMemo(()=>{
    return transactionsYearly.months.filter(m=>m.count>0).map(m=>({
      title:m.label,
      data:m.transactions.filter(t=>{
        if(!query.trim()) return true
        const searchable=t.title ?? ''
        return searchable.toLowerCase().includes(query.toLowerCase())
      }).map(t=>({
        label:m.label,
        transactions:t
      }))
    })).filter(m=>m.data.length>0)
  },[transactionsYearly.months,query])

  const isInitiallyLoading=loading && sections.length===0
  const {isDark}=useTheme()

  return (
    <Wrapper loading={false}>
      <View className='flex-1'>
        <SectionList
        sections={isInitiallyLoading?[]:sections}
        keyExtractor={(item)=>item.transactions.id}
        contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10,paddingBottom:64}}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={
          <HeaderList
          pressableNeeded={false}
          setQuery={setQuery}
          headingText={'Transaction history'}
          inlineText={"Search transactions..."}/>}
        renderSectionHeader={({section:{title}})=>(
          <View 
            className='px-2 py-2 mb-1 mx-4'
            style={{
              backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6',
              borderRadius: 8
            }}>
            <Text 
              className='text-base font-bold'
              style={{ fontFamily: 'Sans-Semibold' }}>
                {title}
            </Text>
          </View>)}
        ListEmptyComponent={
          <FakeLoad
          loading={isInitiallyLoading}
          hasAccounts={transactionsYearly.months.some(m=>m.count>0)}
          query={query}
          unmatchText='No matching transaction found'
          defaultText='Add an transaction'>
          {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
            <View 
              key={item}
              className='w-full h-20 rounded-md'
              style={{
                backgroundColor:isDark?"#857A83":"#E3C1DE"
              }}>
            </View>
          ))}
          </FakeLoad>
        }
        renderItem={({item})=>(
          <RenderTransaction
          item={item}
          accounts={accounts}
          categories={categories}
          editTransaction={editTransaction}
          removeTransaction={removeTransaction}
          fetchTransaction={fetchTransaction}/>
        )}
        />
      </View>
    </Wrapper>

   
  )
}

export default Transactions