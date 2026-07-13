import { View} from 'react-native'
import React from 'react'
import AccountData from './AccountData'


const CreateAccount = ({creatingAccount,pageError,pageLoad,openModal,setOpenModal,setPageLoad,setPageError}:createAccountsProps) => {
  
  return (

    <View>
      <AccountData 
      error={pageError}
      loading={pageLoad}
      submitText={"Add new account"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      pressableFlex={3}
      viewFlex={4}
      
      onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')

        try{
          await creatingAccount({
            ...values
          })
        }catch(err:any){
           const message=err?.response?.data?.message || err?.message || "Failed to Create new Budget"

          setPageError(message)
        }finally{
          setPageLoad(false)
        }
      }}/>
    </View>
  )
}

export default CreateAccount
