import { View } from 'react-native'
import BudgetModel from './BudgetModel'
import { useAuth } from '@clerk/clerk-expo'
import { useGuest } from '@/hooks/useGuest'

const CreateBudget = (
  {
    creatingNewBudget,
    categories,
    setPageLoad,
    pageLoad,
    setPageError,
    pageError,
    openModal,
    setOpenModal
  }:createBudgetPageProps) => {

  const {isSignedIn}=useAuth()
  const guest=useGuest()
  const isGuest=!isSignedIn

  return (
    <View>
      <BudgetModel
      error={pageError}
      setError={setPageError}
      loading={pageLoad}
      categories={categories}
      submitText={"Add new budget"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      headerText='Create Your Budget'
      
      onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')

        try{
          await creatingNewBudget({
            ...values
          })

        }catch(err:any){
           const message=isGuest?"Failed to Create new Budget": err?.response?.data?.message || err?.message  

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