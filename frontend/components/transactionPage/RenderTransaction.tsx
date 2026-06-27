import { View, Text ,Pressable, Modal,Animated} from 'react-native'
import React,{useState,useRef} from 'react'
import TransactionComp from './TransactionComp'
import { getIconByName } from '../comps/Mode/ModalComp'
import { ButtonNeed } from '../comps/ButtonNeed'
import Animateddrop from '../comps/AnimatedStretch/Animateddrop'
import OptionBtn from '../comps/OptionBtn'

type renderTransactionProps={
  item:Transaction 
  editTransaction:(id:string, data:updateTransactionProps)=>Promise<void>
  removeTransaction:(id:string)=>Promise<void>
  accounts:Account[]
   categories:Category[]
   fetchTransaction:(id:string)=>Promise<void>
}
const RenderTransaction = ({item,editTransaction,removeTransaction,accounts,categories}:renderTransactionProps) => {

  const [editPageLoad,setEditPageLoad]=useState(false)
  const [deleteLoad,setDeleteLoad]=useState(false)
  const [pageError,setPageError]=useState<string| null>('')
  const [openEdit,setOpenEdit]=useState(false)

  console.log(item.account)

  const handleDeleteTransaction=async()=>{
    setDeleteLoad(true)
    setPageError("")
    try{
      await removeTransaction(item.id)
    }catch(err:any){

      const message=err?.response?.data?.message || err?.message || "Failed to sign in"

      setPageError(message)
    }finally{
      setDeleteLoad(false)
    }
  }
 

  const ShowAmount=({item}:{item:Transaction})=>{
    if(item.type==="EXPENSE"){
      return(
        <View className='bg-red-100 rounded-md px-3 py-1'>
          <Text className='text-red-400 text-xs font-semibold'>
            - {item.amount}
          </Text>
        </View>
      )
    }else{
      return (
        <View className='bg-green-200 rounded-xl px-3 py-2'>
          <Text className="text-green-600 text-xs font-semibold">
            + {item.amount}
          </Text>
        </View>
      )
    }
  }
  return (
    <View className='px-4'>
      
      <Animateddrop
        firstChild={
      <View 
      className=' flex-row justify-between items-center'>

          <View className='flex-row gap-x-5'>
             <View className='rounded-lg p-2'
           style={{
            backgroundColor:item.category?.color.darkColor
           }}>
            {getIconByName(item.category?.icon ?? null,false)}
           </View>

           <View className='flex-col gap-y-2'>
            <Text className='biggerText font-semibold'>{item.title}</Text>
            <View className='flex-row gap-3 '>
              <Text className='smallText text-xs'>
                {item.account?.name}
              </Text>
              <Text className='smallText text-xs '>
                {item.date}
              </Text>
            </View>
           </View>
          </View>

           <View>

            <Text>
              <ShowAmount
              item={item}
              />
            </Text>
           </View>

      </View>}

      secChild={
      <View style={{paddingTop:8,gap:4}}>
          <Text style={{color:"#a3a3a3"}}>
            Account:{item.account?.name}
          </Text>
          <View className='flex-row gap-x-4'>
            <Text className="flex-grow smallText">{item.category?.name}</Text>


            <OptionBtn
          onPress={()=>setOpenEdit(true)}
          btnText={"Edit"}
          disabled={editPageLoad}
          loading={editPageLoad}
          />

            <OptionBtn
          onPress={handleDeleteTransaction}
          btnText={"Remove"}
          disabled={ deleteLoad}
          loading={deleteLoad}
          />
 
          </View>
      </View>}
      secStyle={{
  
      }}
      maxExpandedHeight={400}/>

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
       error={pageError}
       pressableFlex={2}
       viewFlex={3}
         openCreate={openEdit}
         setOpenCreate={setOpenEdit}
        accounts={accounts}
        categories={categories}
        submitText={"Update"}
        loading={editPageLoad}
        
        onSubmit={async(values)=>{
        setEditPageLoad(true)
        setPageError('')
        try{
        await editTransaction(item.id,{...values})
        }catch(err:any){
          const message=err?.response?.data?.message || err?.message || "Failed to sign in"
        setPageError(message)
        }finally{

        setEditPageLoad(false)
        
          }}}/>
    </View>
  )
}

export default RenderTransaction