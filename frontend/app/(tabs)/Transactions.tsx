import { View, Text , FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useTransaction } from '@/hooks/useTransaction'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import CreateTransaction from '@/components/transactionPage/CreateTransaction'
import HeaderList from '@/components/comps/Flat/HeaderList'
import RenderTransaction from '@/components/transactionPage/RenderTransaction'
import { FakeLoad } from '../(usertab)/AccountPage'
import { useTheme } from '@/hooks/useTheme'

const Transactions = () => {
  const {transactions,creatingNewTransaction,editTransaction,removeTransaction,fetchTransaction,loading}=useTransaction()


  const {accounts}=useAccount()
  const {categories}=useCategory()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string | null>(null)
  const [openCreate,setOpenCreate]=useState(false)

  const [query,setQuery]=useState('')

  const isInitiallyLoading=loading && transactions.length===0
  const {isDark}=useTheme()

  const filteredData=transactions.filter(item=>{
    const searchable=item.title??""
    return searchable.toLowerCase().includes(query.toLowerCase())
  })
  
  return (

    <Wrapper loading={false}>

      <CreateTransaction
      openCreate={openCreate}
      setOpenCreate={setOpenCreate}
      accounts={accounts}
      categories={categories}
      pageLoad={pageLoad}
      setPageLoad={setPageLoad}
      pageError={pageError}
      setPageError={setPageError}
      creatingNewTransaction={creatingNewTransaction}
      />

      <FlatList
      data={filteredData}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10}}
      
      ListHeaderComponent={
        <HeaderList
        setQuery={setQuery}
        headingText={'Add new Transactions'}
        onPress={()=>setOpenCreate(true)}
        inlineText={"Search transactions..."}/>
      }
      ListEmptyComponent={
        <FakeLoad
        loading={isInitiallyLoading}
        hasAccounts={transactions.length>0}
        query={query}
        unmatchText='No matching transaction found'
        defaultText='Add an transaction'>
        {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
          <View key={item}
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
    </Wrapper>

   
  )
}

export default Transactions