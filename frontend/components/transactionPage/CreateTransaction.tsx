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
  pageError:string | null
}
const CreateTransaction = ({openCreate,setOpenCreate,accounts,categories,pageLoad,setPageLoad,setPageError,creatingNewTransaction,pageError}:transactionCreatProps) => {

  return (
    <View>
      <TransactionComp
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        accounts={accounts}
        categories={categories}
        submitText={"Create"}
        loading={pageLoad}
        pressableFlex={4}
        viewFlex={6}
        error={pageError}
        
        onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError(null)

        try{
        await creatingNewTransaction({
          ...values
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
  )
}

export default CreateTransaction