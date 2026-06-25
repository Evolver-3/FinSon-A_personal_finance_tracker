import { View, Text, Pressable, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TextData } from '../comps/TextData'
import ModalComp, { SelectType } from '../comps/Mode/ModalComp'
import { CalendarRangeIcon } from 'lucide-react-native'
import SelectDropdown from '../comps/SelectDropdown'
import { ButtonNeed } from '../comps/ButtonNeed'
import DateTimePicker from '@react-native-community/datetimepicker'
import ThemeIcon from '../Theme/ThemeIcon'
import ErrorPopUp from '../comps/ErrorPopUp'

type TransactionCompProps={
  initialValues?:Partial<createTransactionProps>
  accounts:Account[]
  categories:Category[]
  type?:"INCOME"|"EXPENSE"
  onSubmit:(values:createTransactionProps)=>Promise<void>
  submitText:string 
  loading:boolean
  openCreate:boolean
  setOpenCreate:React.Dispatch<React.SetStateAction<boolean>>
  pressableFlex:number 
  viewFlex:number
  error:string | null
}
const TransactionComp = ({initialValues,accounts,categories,onSubmit,submitText,loading,openCreate,setOpenCreate,pressableFlex,viewFlex,error}:TransactionCompProps) => {

  const [title,setTitle]=useState(initialValues?.title ?? "")
    const [amount,setAmount]=useState(initialValues?.amount ??"")
    const [type,setType]=useState<"INCOME"|"EXPENSE">(initialValues?.type ??"EXPENSE")
    const [note,setNote]=useState(initialValues?.note ?? "")
    const [date,setDate]=useState<Date>( initialValues?.date ?? new Date())
    const [accountId,setAccountId]=useState(initialValues?.accountId ??'')
    const [categoryId,setCategoryId]=useState(initialValues?.categoryId ??'')

    
    const [datePickerOpen,setDatePickerOpen]=useState(false)
  
    useEffect(()=>{
      if(initialValues){
        setTitle(initialValues.title ?? "")
        setAmount(initialValues.amount ?? "")
        setType(initialValues.type ??"EXPENSE")
        setNote(initialValues.note ?? "")
        setDate(initialValues.date ?? new Date())
        setAccountId(initialValues.accountId ?? "")
        setCategoryId(initialValues.categoryId ?? "")
      }
    },[initialValues])

    const handleSubmit=async()=>{
      await onSubmit({title,amount,type,note,accountId,categoryId,date})
      setTitle("")
      setAmount("")
      setType("EXPENSE")
      setNote("")
      setAccountId("")
      setCategoryId("")
      if(!error){
        setOpenCreate(false)
      }
    }
    
     const formattedDate=date? date.toLocaleDateString('en-IN',{
      day:"numeric",
      month:"short",
      year:"numeric"
     }):'Select Date'

  return (
    <ModalComp
    visible={openCreate}
    onRequestClose={()=>setOpenCreate(false)}
    textblock={"Create Transaction"}
    pressableFlex={pressableFlex}
    viewFlex={viewFlex}>

      {/* <ErrorPopUp
      errorMessage={error}/> */}

      
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
          <View className="flex-row gap-x-3 p-1 py-1 mainbg rounded-xl"
          style={{
            elevation:2
          }}>
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

        <View className="flex-row items-center justify-center gap-x-4">

          <TextInput
          value={formattedDate}
          editable={false}
          className="mainbg"
          style={{
            paddingHorizontal:20,
            paddingVertical:6,
            borderRadius:10,
            textAlign:"center",
            elevation:2
          }}
          />
          <Pressable
          onPress={()=>setDatePickerOpen(true)}>
            <ThemeIcon
            icon={CalendarRangeIcon}
            size={20}/>
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
       
        <View className='flex-row items-center justify-center gap-x-3'>
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
        onPress={handleSubmit}
        text={submitText}
        disabled={loading}
        loading={loading}
        style={{}}
        />
    </ModalComp>
 
    
  )
}

export default TransactionComp