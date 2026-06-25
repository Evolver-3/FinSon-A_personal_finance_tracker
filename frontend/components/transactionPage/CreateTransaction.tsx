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
  setPageError:React.Dispatch<React.SetStateAction<string| null>>
  creatingNewTransaction:(values:createTransactionProps)=>Promise<void> 
  error:string | null
  pageError:string | null
}
const CreateTransaction = ({openCreate,setOpenCreate,accounts,categories,pageLoad,setPageLoad,setPageError,creatingNewTransaction,error,pageError}:transactionCreatProps) => {

  const fullError=pageError|| error
  return (
    <View>
      <TransactionComp
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        accounts={accounts}
        categories={categories}
        submitText={"Create"}
        loading={pageLoad}
        pressableFlex={2}
        viewFlex={6}
        error={fullError}
        
        onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError(null)

        try{
        await creatingNewTransaction({
          ...values
        })
        setOpenCreate(false)
        }catch(err:any){

        setPageError(err?.message || error || "Failed to create transaction")
        }finally{
        setPageLoad(false)
        
        }}}/>
    </View>
  )
}

export default CreateTransaction