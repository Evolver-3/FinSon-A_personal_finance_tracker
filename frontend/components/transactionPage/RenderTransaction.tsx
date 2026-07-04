import { View, Text ,Pressable, Modal,Animated, ActivityIndicator} from 'react-native'
import React,{useState,useRef} from 'react'
import TransactionComp from './TransactionComp'
import { getIconByName } from '../comps/Mode/ModalComp'
import Animateddrop from '../comps/Animate/Animateddrop'
import PressedAnimate from '../comps/Animate/PressedAnimate'
import { useTheme } from '@/hooks/useTheme'

type renderTransactionProps={
  item:Transaction 
  editTransaction:(id:string, data:updateTransactionProps)=>Promise<void>
  removeTransaction:(id:string)=>Promise<void>
  accounts:Account[]
   categories:Category[]
   fetchTransaction:(id:string)=>Promise<void>
}
const RenderTransaction = ({item,editTransaction,removeTransaction,accounts,categories}:renderTransactionProps) => {

  const {isDark}=useTheme()
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
 


  return (
    <View className='px-4'>
      
      <Animateddrop
      viewstyle={{
        backgroundColor:isDark?"#393939":item.category?.color.colors,
        elevation:2
      }}
        firstChild={
      <View 
      className=' flex-row justify-between items-center'>

          <View className='flex-row gap-x-4 items-center '>
             <View className='rounded-lg p-2'
           style={{
            backgroundColor:item.category?.color.darkColor,
            elevation:5
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

          <PressedAnimate
          onPress={()=>setOpenEdit(true)}
          originalColor={isDark?"#41EC4F":"#ADF7B3"}
          pressedColor={"#CEE9D0"}
          style={{
            width:60,
            height:30,
            borderRadius:5,
            paddingVertical:2,
          }}
          >
             <Text
             className="oppText text-sm"
             >Edit</Text>
          </PressedAnimate>


          <PressedAnimate
          onPress={handleDeleteTransaction}
          originalColor={"#D28E89"}
          pressedColor={"#EAA59E"}
          style={{
            width:70,
            height:30,
            borderRadius:5,
          }}
          >
            {deleteLoad ?<ActivityIndicator color={"#ffffff"}/>: <Text className='oppText text-sm'>Remove</Text>}
          </PressedAnimate>
          
 
          </View>
      </View>}
      secStyle={{}}/>

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



export const ShowAmount=({item}:{item:Transaction})=>{
    if(item.type==="EXPENSE"){
      return(
        <View className='bg-red-100 rounded-md px-3 py-1'>
          <Text className='text-red-600 text-xs font-semibold'>
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