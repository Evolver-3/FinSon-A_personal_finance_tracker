import { View, Text ,Pressable, Platform, FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useTransaction } from '@/hooks/useTransaction'
import { TextData } from '@/components/comps/TextData'
import { SelectType } from '@/components/comps/Mode/ModalComp'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CalendarRangeIcon } from 'lucide-react-native'
import TopUserComp from '@/components/comps/TopUserComp'
import SelectDropdown from '@/components/transactionPage/SelectDropdown'
import TransactionComp from '@/components/transactionPage/TransactionComp'
import CreateTransaction from '@/components/transactionPage/CreateTransaction'
import HeaderList from '@/components/comps/Flat/HeaderList'
import RenderTransaction from '@/components/transactionPage/RenderTransaction'

const Transactions = () => {
  const {loading,error,transactions,creatingNewTransaction,editTransaction,removeTransaction}=useTransaction()

  const {accounts}=useAccount()
  const {categories}=useCategory()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string>('')
  const [openCreate,setOpenCreate]=useState(false)
  return (
    <Wrapper loading={loading}>

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
        item={item}
        loading={pageLoad}
        editTransaction={editTransaction}
        removeTransaction={removeTransaction}/>
      )}
      />
    </Wrapper>

   
  )
}

export default Transactions