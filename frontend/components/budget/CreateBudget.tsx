import { View, Text } from 'react-native'
import React from 'react'
import BudgetModel from './BudgetModel'

type createBudgetPageProps={
  creatingNewBudget:(values:createBudgetProps)=>Promise<void>
  error:string | null
  loading:boolean
  categories:Category[]
  pageLoad:boolean 
  setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
  setPageError:React.Dispatch<React.SetStateAction<string>>
  pageError:string
}
const CreateBudget = ({creatingNewBudget,error,categories,setPageLoad,pageLoad,setPageError,pageError}:createBudgetPageProps) => {
  return (
    <View>
      <BudgetModel
      error={pageError}
      loading={pageLoad}
      categories={categories}
      submitText={"Add new budget"}

      
      onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')

        try{
          await creatingNewBudget({
            ...values
          })
        }catch(err:any){
          const fullError=err|| error 

          setPageError(fullError)
        }finally{
          setPageLoad(false)
        }
      }}
      />
    </View>
  )
}

export default CreateBudget