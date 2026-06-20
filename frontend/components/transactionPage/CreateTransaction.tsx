import { View, Text } from 'react-native'
import React from 'react'
import TransactionComp from './TransactionComp'

type transactionCreatProps={
  openCreate:boolean 
  setOpenCreate:React.Dispatch<React.SetStateAction<boolean>>
  accounts:Account[]
  categories:Category[]
  pageLoad:boolean 
  setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
  setPageError:React.Dispatch<React.SetStateAction<string>>
  creatingNewTransaction:(values:createTransactionProps)=>Promise<void> 
  error:string | null
}
const CreateTransaction = ({openCreate,setOpenCreate,accounts,categories,pageLoad,setPageLoad,setPageError,creatingNewTransaction,error}:transactionCreatProps) => {
  return (
    <View>
      <TransactionComp
         openCreate={openCreate}
         setOpenCreate={setOpenCreate}
        accounts={accounts}
        categories={categories}
        submitText={"Create"}
        loading={pageLoad}
        
        onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')
        try{
        await creatingNewTransaction({
          ...values
        })
        }catch(err:any){
        const fullError=err||error
        setPageError(fullError)
        }finally{
        setPageLoad(false)
        
          }}}/>
    </View>
  )
}

export default CreateTransaction