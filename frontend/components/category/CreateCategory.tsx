import UpdateCategory from "./UpdateCategory";
const CreateCategory=({creatingCategory,pageError,loading,visible,setVisible,setloading,setPageError}:createCateProps)=>{
  return(
    <UpdateCategory
      error={pageError}
      setError={setPageError}
      loading={loading}
      submitText={"Add new account"}
      openModal={visible}
      setOpenModal={setVisible}
      
      onSubmit={async(values)=>{
        setloading(true)
        setPageError('')

        try{
          await creatingCategory({
            ...values
          })
        }catch(err:any){
          const message="Failed to Create new Category"
          setPageError(message)
          throw err
        }finally{
          setloading(false)
        }
      }}
    />

  )
}

export default CreateCategory