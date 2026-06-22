import { View, Text ,Pressable, Modal} from 'react-native'
import React,{useState} from 'react'
import TransactionComp from './TransactionComp'
import { getIconByName } from '../comps/Mode/ModalComp'
import { ButtonNeed } from '../comps/ButtonNeed'

type renderTransactionProps={
  item:Transaction 
  loading:boolean  
  editTransaction:(id:string, data:updateTransactionProps)=>Promise<void>
  removeTransaction:(id:string)=>Promise<void>
  accounts:Account[]
   categories:Category[]
   error:string| null
   fetchTransaction:(id:string)=>Promise<void>
}
const RenderTransaction = ({item,loading,editTransaction,removeTransaction,accounts,categories,error}:renderTransactionProps) => {

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string| null>('')
  const [openTransaction,setOpenTransaction]=useState(false)
  const [openEdit,setOpenEdit]=useState(false)

  console.log(item.account)

  const handleDeleteTransaction=async()=>{
    setPageLoad(true)
    setPageError("")

    try{
      await removeTransaction(item.id)
    }catch(err:any){
      const fullError=err || error
      setPageError(fullError)
    }finally{
      setPageLoad(false)
    }

  }

  const ShowAmount=({item}:{item:Transaction})=>{
    if(item.type==="EXPENSE"){
      return(
        <View className='bg-red-200 rounded-xl px-3 py-2'>
          <Text className='text-red-600 text-md'>
            -{item.amount}
          </Text>
        </View>
      )
    }else{
      return (
        <View className='bg-green-200 rounded-xl px-3 py-2'>
          <Text className="text-green-600 text-md">
            +{item.amount}
          </Text>
        </View>
      )
    }
  }
  return (
    <View className='px-4 flex-1'>
      <Pressable 
      onPress={()=>setOpenTransaction(true)}
      className='flex-col gap-y-2 mt-3'>

        <View className='rounded-lg bg-neutral-700
         p-3 flex-row justify-between items-center'>

           <View className='rounded-lg p-2'
           style={{
            backgroundColor:item.category?.color.darkColor
           }}>
            {getIconByName(item.category?.icon ?? null,false)}
           </View>

           <View className='flex-col gap-y-2'>
            <Text className='text-white font-semibold'>{item.title}</Text>
            <View className='flex-row gap-3 '>
              <Text className='text-neutral-200 text-xs'>
                {item.account?.name}
              </Text>
              <Text className='text-xs text-neutral-200'>
                {item.date}
              </Text>
            </View>
           </View>

           <View>
            <Text>
              <ShowAmount
              item={item}
              />
            </Text>
           </View>

        </View>
      </Pressable>

       <Pressable className=' items-center justify-center'
       onPress={()=>setOpenTransaction(false)}>
         <Modal
        visible={openTransaction}
        transparent={true}
        animationType='slide'
        onRequestClose={()=>setOpenTransaction(false)}>
          <View className=' p-20 bg-red-600'>

          <ButtonNeed
          onPress={()=>setOpenEdit(true)}
          text={"Edit"}
          disabled={ pageLoad}
          loading={pageLoad}
          style={{}}
          />

          <ButtonNeed
          onPress={handleDeleteTransaction}
          text={"Delete"}
          disabled={ pageLoad}
          loading={pageLoad}
          style={{}}
          />

          

          </View>
        
        
        </Modal>
       </Pressable>
        

      
       <TransactionComp
       initialValues={{
        title:item.title,
        amount:item.amount,
        type:item.type,
        note:item.note ?? "",
        date:new Date(item.date),
        accountId:item.accountId,
        categoryId:item.categoryId

       }}
         openCreate={openEdit}
         setOpenCreate={setOpenEdit}
        accounts={accounts}
        categories={categories}
        submitText={"Update"}
        loading={pageLoad}
        
        onSubmit={async(values)=>{
        setPageLoad(true)
        setPageError('')
        try{
        await editTransaction(item.id,{...values,})
        }catch(err:any){
        const fullError=err||error
        setPageError(fullError)
        }finally{
        setPageLoad(false)
        
          }}}/>
    </View>
  )
}

export default RenderTransaction