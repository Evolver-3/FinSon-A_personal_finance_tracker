import { View, Text ,Pressable, Platform} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useTransaction } from '@/hooks/useTransaction'
import { TextData } from '@/components/comps/TextData'
import { SelectType } from '@/components/comps/Mode/ModalComp'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CalendarRangeIcon } from 'lucide-react-native'
import TopUserComp from '@/components/comps/TopUserComp'
import SelectDropdown from '@/components/transactionPage/SelectDropdown'

const Transactions = () => {
  const {loading,error,transactions,creatingNewTransaction,editTransaction,removeTransaction}=useTransaction()

  const {accounts}=useAccount()
  const {categories}=useCategory()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string>('')

  const [title,setTitle]=useState("")
  const [amount,setAmount]=useState<string>('')
  const [type,setType]=useState<"INCOME"|"EXPENSE">("EXPENSE")
  const [note,setNote]=useState<string>('')
  const [date,setDate]=useState<Date>(new Date())
  const [accountId,setAccountId]=useState('')
  const [categoryId,setCategoryId]=useState('')

  const [datePickerOpen,setDatePickerOpen]=useState(false)

  const handleCreateNewTransaction=async()=>{
    try{
      setPageLoad(true)
      setPageError("")

      await creatingNewTransaction({title,amount,type,note,date,accountId,categoryId})

      setTitle('')
      setAmount('')
      setNote('')
      setType("EXPENSE")
      setDate(new Date())
      setAccountId('')
      setCategoryId('')


    }catch(err:any){
      console.log(err)
      console.log(error)
      const fullError=err||error

      setPageError(fullError)
    }finally{
      setPageLoad(false)
    }
  }
  console.log(transactions)


  return (
    <Wrapper loading={loading}>
       <View className='flex-1 px-4 gap-y-4 pt-4'>

        <TopUserComp
        headingText='Budget'/>

       <TextData
        keyboardType="default"
        tagexist={false}
        tag={''}
        value={title}
        placeholder='Enter Title'
        onChangeText={setTitle}
        secureTextEntry={false}/>

         <TextData
        keyboardType="number-pad"
        tagexist={false}
        tag={''}
        value={amount}
        placeholder='Enter amount'
        onChangeText={setAmount}
        secureTextEntry={false}/>

         <TextData
        keyboardType="default"
        tagexist={false}
        tag={''}
        value={note}
        placeholder='Enter note'
        onChangeText={setNote}
        secureTextEntry={false}/>

        <View className='items-center justify-center '>
          <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">
          <SelectType
          focused={type==="INCOME"}
          onPress={()=>setType("INCOME")}
          text='Income'/>
           
          <SelectType
          focused={type==="EXPENSE"}
          onPress={()=>setType("EXPENSE")}
          text='Expense'/>
          </View>
        </View>

        <View>
          <Pressable
          onPress={()=>setDatePickerOpen(true)}>
            <CalendarRangeIcon color={"#fff"}/>
          </Pressable>

          {datePickerOpen &&(
            <DateTimePicker
            value={date ?? new Date()}
            mode="date"
            display={Platform.OS==="ios"?"spinner":"calendar"}
            onChange={(event,pickedDate)=>{
              if(Platform.OS!=="ios"){
                setDatePickerOpen(false)
              }
              if(pickedDate){
                setDate(pickedDate)
              }
            }}
            />
          )}
        </View>
       
        <View>
         <SelectDropdown
         options={accounts.map(acc=>({
          id:acc.id,
          name:acc.name,
          color:acc.color
         }))}
         selectedId={accountId}
         onSelect={setAccountId}
         placeholder='Select Account'/>

         <SelectDropdown
         options={categories.map(cat=>({
          id:cat.id,
          name:cat.name,
          color:cat.color
         }))}
         selectedId={categoryId}
         onSelect={setCategoryId}
         placeholder='Select Category'/>
        </View>

        <ButtonNeed
        onPress={handleCreateNewTransaction}
        text={"Create"}
        disabled={pageLoad}
        loading={pageLoad}
        style={{}}
        />
      </View>
    </Wrapper>
  )
}

export default Transactions