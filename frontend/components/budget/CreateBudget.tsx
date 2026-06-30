import { View } from 'react-native'
import React from 'react'
import BudgetModel from './BudgetModel'

type budgetValues={
  amount:number
  month:number
  year:number
  categoryId:string
}
type createBudgetPageProps={
  creatingNewBudget:(values:budgetValues)=>Promise<void>
  loading:boolean
  categories:Category[]
  pageLoad:boolean 
  setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
  setPageError:React.Dispatch<React.SetStateAction<string>>
  pageError:string
  openModal:boolean
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  viewFlex:number 
  pressableFlex:number
}
const CreateBudget = ({creatingNewBudget,categories,setPageLoad,pageLoad,setPageError,pageError,openModal,setOpenModal,viewFlex,pressableFlex}:createBudgetPageProps) => {
  return (
    <View>
      <BudgetModel
      error={pageError}
      loading={pageLoad}
      categories={categories}
      submitText={"Add new budget"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      viewFlex={viewFlex}
      pressableFlex={pressableFlex}

      
      onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')

        try{
          await creatingNewBudget({
            ...values
          })

        }catch(err:any){
           const message=err?.response?.data?.message || err?.message || "Failed to Create new Budget"

          setPageError(message)
        }finally{
          setPageLoad(false)
        }
      }}
      />
    </View>
  )
}

export default CreateBudget