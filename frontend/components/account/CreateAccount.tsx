import AccountData from './AccountData'

const CreateAccount = ({creatingAccount,pageError,pageLoad,openModal,setOpenModal,setPageLoad,setPageError}:createAccountsProps) => {
  
  return (
      <AccountData 
      error={pageError}
      setError={setPageError}
      loading={pageLoad}
      submitText={"Add new account"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      pressableFlex={3}
      viewFlex={7}
      
      onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')

        try{
          await creatingAccount({
            ...values
          })
        }catch(err:any){
          const message="Failed to Create new Account"
          setPageError(message)
          throw err
        }finally{
          setPageLoad(false)
        }
      }}/>
  )
}

export default CreateAccount
