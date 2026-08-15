import { View, Text , ActivityIndicator} from 'react-native'
import React,{useState} from 'react'
import TransactionComp from './TransactionComp'
import { getIconByName } from '../comps/Mode/ModalComp'
import Animateddrop from '../comps/Animate/Animateddrop'
import PressedAnimate from '../comps/Animate/PressedAnimate'
import { useTheme } from '@/hooks/useTheme'
import { formatDate,formatAmount } from '../comps/DateFormat'
import { useCurrency } from '@/context/CurrencyContext'
import ThemeIcon from '@/components/Theme/ThemeIcon'

const RenderTransaction = ({item,editTransaction,removeTransaction,accounts,categories}:renderTransactionProps) => {

  const {isDark}=useTheme()
  const [editPageLoad,setEditPageLoad]=useState(false)
  const [deleteLoad,setDeleteLoad]=useState(false)
  const [pageError,setPageError]=useState<string| null>('')
  const [openEdit,setOpenEdit]=useState(false)
  const {symbol}=useCurrency()

  const handleDeleteTransaction=async()=>{
    setDeleteLoad(true)
    setPageError("")
    try{
      await removeTransaction(item?.transactions.id)
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
        backgroundColor:isDark?"#212121":"#F2F2F2",
        elevation:2
      }}
        firstChild={
        <View 
      className=' flex-row justify-between items-center'>

          <View className='flex-row gap-x-5 items-center '>
            <View
              className='p-2 items-center rounded-lg'
              style={{ 
                elevation:5,
                backgroundColor:item.transactions.category?.color.darkColor
              }}>
                {getIconByName(item.transactions.category?.icon ?? null,false,isDark?"#000000":"#ffffff",24)}
            </View>

           <View className='flex-col gap-y-2'>
            <Text className='smallText font-semibold uppercase'>{item.transactions.title}</Text>

              
              <Text className='text-xs minText'
                style={{
                  fontFamily:"Sans-ExtraBold"
                }}>
                {formatDate(item.transactions.date)}
              </Text>
  
           </View>

           <View 
          className='px-2 py-1 rounded-md'
          style={{
                backgroundColor:"#C4B6D2"
                }}>
            <Text
              style={{
                  color:isDark?"#000000":"#ffffff",
                  fontSize:8,
                  fontFamily:"Sans-Semibold"
                }}>
              {item.transactions.account?.name}
            </Text>
                      
          </View>
          <View 
          className='px-2 py-1 rounded-md'
          style={{
                backgroundColor:"#C4B6D2"
                }}>
            <Text
              style={{
                  color:isDark?"#000000":"#ffffff",
                  fontSize:8,
                  fontFamily:"Sans-Semibold"
                }}>
              {item.transactions.category?.name}
            </Text>
                      
          </View>

          </View>

          
           {item.transactions.type==="EXPENSE" ? (
            <View>
              <Text>-</Text>
            <ThemeIcon icon={symbol} size={20}/>
            <Text className="font-semibold text-xl biggerText  text-red-400 dark:text-red-400 "
            >{formatAmount(item.transactions.amount)}</Text>
             </View> 
              ):(
                <View>
                <Text>+</Text>
                <ThemeIcon icon={symbol} size={20}/>
              <Text className="font-semibold text-sm biggerText  text-green-400 px-2 py-1 rounded-lg bg-green-100  dark:bg-gray-600">{formatAmount(item.transactions.amount)}</Text>
              </View>
            )}

        </View>}

        secChild={
        <View style={{paddingTop:8,gap:4,flexDirection:"row",
          justifyContent:"space-between"
        }}>
          <View className='flex-row gap-x-5 justify-end flex-grow'>
            <PressedAnimate
                      onPress={()=>setOpenEdit(true)}
                      originalColor={isDark?"#518151":"#ADF7B3"}
                      pressedColor={isDark?"#49B649":"#CEE9D0"}
                      style={{
                        width:40,
                        height:20,
                        borderRadius:5,
                        alignItems:"center",
                        justifyContent:"center",
                        elevation:6}}>
                              
                      <Text
                        className="smallText text-xs"
                        style={{
                                fontFamily:"Sans-Semibold"
                              }}>
                                Edit
                      </Text>
                    </PressedAnimate>
                              
                    <PressedAnimate
                      onPress={handleDeleteTransaction}
                      originalColor={isDark?"#753B2F":"#D28E89"}
                      pressedColor={"#EAA59E"}
                      style={{
                        width:60,
                        height:20,
                        borderRadius:5,
                        alignItems:'center',
                        justifyContent:"center",
                        elevation:6}}>
                  
                        {deleteLoad ?
                        (<ActivityIndicator color={"#ffffff"} size={10}/>):
                        <Text 
                          className="smallText text-xs"
                          style={{
                                    fontFamily:"Sans-Semibold"
                                }}>
                            Remove
                        </Text>}
                    </PressedAnimate>
          </View>
          
          </View>}
        
      secStyle={{}}/>

       <TransactionComp
       initialValues={{
        title:item.transactions.title,
        amount:item.transactions.amount,
        type:item.transactions.type,
        note:item.transactions.note ?? "",
        date:new Date(item.transactions.date),
        accountId:item.transactions.accountId,
        categoryId:item.transactions.categoryId
       }}
       textBlock={"Edit your transaction"}
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
        await editTransaction(item.transactions.id,{...values})
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

