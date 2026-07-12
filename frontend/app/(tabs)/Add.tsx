import { View, Text } from 'react-native'
import  { useCallback, useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import CreateTransaction from '@/components/transactionPage/CreateTransaction'
import { useFocusEffect, useRouter } from 'expo-router'
import { useTransaction } from '@/hooks/useTransaction'
import TransactionComp from '@/components/transactionPage/TransactionComp'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import TransactionForm from '@/components/transactionPage/TransactionForm'

const Add = () => {
const {creatingNewTransaction,fetchAllTransactions}=useTransaction()

  const router=useRouter()

   useFocusEffect(
        useCallback(()=>{
          fetchAllTransactions()
        },[])
      )

  const {accounts}=useAccount()
  const {categories}=useCategory()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string | null>(null)


  return (
   <Wrapper loading={false}>

    <View
    style={{
      height:40
    }}/>
     <View className=' px-7 '>
    <Text 
    className="biggerText text-xl"
    style={{
        fontFamily:"Sans-Extrabold"
      }}>
        Create a new Transaction
    </Text>
   
     <TransactionForm
     
        accounts={accounts ?? []}
        categories={categories ?? []}
        submitText={"Create"}
        loading={pageLoad}
        error={pageError} 
        onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError(null)

        try{
        await creatingNewTransaction({
          ...values
        })

        router.navigate({
          pathname:"/(tabs)/Transactions"
        })

        }catch(err:any){

        const message=err?.response?.data?.message || err?.message || "Failed to create a transaction"
        setPageError(message)

        setTimeout(()=>{
          setPageError(null)
        },3000)
        throw err

        }finally{
        setPageLoad(false)
        
      }}}/>

    </View>


   </Wrapper>
  )
}

export default Add