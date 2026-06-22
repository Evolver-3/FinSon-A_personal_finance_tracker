import { View, Text , FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useTransaction } from '@/hooks/useTransaction'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import CreateTransaction from '@/components/transactionPage/CreateTransaction'
import HeaderList from '@/components/comps/Flat/HeaderList'
import RenderTransaction from '@/components/transactionPage/RenderTransaction'

const Transactions = () => {
  const {loading,error,transactions,creatingNewTransaction,editTransaction,removeTransaction,fetchTransaction}=useTransaction()

  const {accounts}=useAccount()
  const {categories}=useCategory()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string>('')
  const [openCreate,setOpenCreate]=useState(false)
  
  return (

    <Wrapper loading={false}>

      <CreateTransaction
      openCreate={openCreate}
      setOpenCreate={setOpenCreate}
      accounts={accounts}
      categories={categories}
      pageLoad={pageLoad}
      setPageLoad={setPageLoad}
      setPageError={setPageError}
      creatingNewTransaction={creatingNewTransaction}
      error={error}
      />

      <FlatList
      data={transactions}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10}}
      
      ListHeaderComponent={
        <HeaderList
        headingText={'Add new Transactions'}
        onPress={()=>setOpenCreate(true)}
        inlineText={"Search transactions..."}/>
      }
      ListEmptyComponent={
        <View className='px-4'>
          <Text style={{color:"#ffffff"}}>No transaction exist</Text>
        </View>
      }
      renderItem={({item})=>(
        <RenderTransaction
        error={error}
        item={item}
        accounts={accounts}
        categories={categories}
        loading={pageLoad}
        editTransaction={editTransaction}
        removeTransaction={removeTransaction}
        fetchTransaction={fetchTransaction}/>
      )}
      />
    </Wrapper>

   
  )
}

export default Transactions