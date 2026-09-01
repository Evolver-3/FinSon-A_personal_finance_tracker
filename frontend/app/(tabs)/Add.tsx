import { View, Text } from 'react-native'
import  { useCallback, useState } from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import { useFocusEffect, useRouter } from 'expo-router'
import { useTransaction } from '@/hooks/useTransaction'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import TransactionForm from '@/components/transactionPage/TransactionForm'

const Add = () => {
const {creatingNewTransaction,getByYear}=useTransaction()

  const router=useRouter()

   useFocusEffect(
        useCallback(()=>{
          getByYear(new Date().getFullYear())
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
          pathname:"/(usertab)/Transactions"
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