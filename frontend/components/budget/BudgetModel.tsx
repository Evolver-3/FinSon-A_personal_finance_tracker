import { View,Text} from 'react-native'
import { useState,useEffect} from 'react'
import { TextData } from '../comps/TextData'
import ModalComp from '../comps/Mode/ModalComp'
import SelectDropdown from '../comps/SelectDropdown'
import { ButtonNeed } from '../comps/ButtonNeed'
import ErrorPopUp from '../comps/ErrorPopUp'
import { monthData, yearData } from '@/data'

const BudgetModel = ({initialValues,error,setError,loading,categories,onSubmit,submitText,openModal,setOpenModal,headerText}:budgetModalProps) => {

  const [amount,setAmount]=useState(initialValues?.amount?.toString()?? "")
  const [month,setMonth]=useState(initialValues?.month?.toString() ?? "")
  const [year,setYear]=useState( String(new Date().getFullYear()) ?? "")
  const [categoryId,setCategoryId]=useState(initialValues?.categoryId ?? '')
 
  useEffect(()=>{
    if(initialValues){
      setAmount(initialValues.amount?.toString() ?? "")
      setMonth(initialValues.month?.toString() ?? "")
      setYear(initialValues.year?.toString() ?? "")
      setCategoryId(initialValues?.categoryId?.toString() ?? "")
    }
  },[initialValues])

  const handleAmountChange=(text:string)=>{
        const amountNeeded=text.replace(/[^0-9.]/g, "")

        if(/^\d*\.?\d{0,2}$/.test(amountNeeded)){
          setAmount(amountNeeded)
        }
      }

  const handleSubmit=async()=>{
    if(!amount || !month || !year || !categoryId){
      setError("Some fields are missing.")
      return
    }
    await onSubmit({amount:parseFloat(amount),month:parseInt(month),year:Number(year),categoryId})

    setAmount("")
    setMonth("")
    setYear("")
    setCategoryId("")

    setOpenModal(false)
  }

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setError(null)
    },3000)
    return()=>clearTimeout(timer)
  },[error])

  return (

    <ModalComp
    visible={openModal}
    onRequestClose={()=>setOpenModal(false)}
    textblock={"New budget"}>

      <View className='flex-col gap-y-5 mt-7 relative'>
       <View className='flex-row justify-between items-center'>
         <Text className="text-xl font-semibold text-black dark:text-white">
          {headerText}
        </Text>

        <ErrorPopUp
        style={{
          opacity:error?100:0
        }}
        errorMessage={error }/>
       </View>

      <TextData
      tag={''}
      placeholder={'0.00'}
      value={amount}
      onChangeText={handleAmountChange}
      secureTextEntry={false}
      tagexist={false}
      keyboardType="decimal-pad"
      />


      <SelectDropdown
      options={monthData.map(mon=>({
        id:mon.id,
        name:mon.month
      }))}
      selectedId={month}
      onSelect={setMonth}
      placeholder='Choose Month'
      />

      {/* <SelectDropdown
      options={yearData.map(yr=>({
        id:yr.id,
        name:yr.year
      }))}
      selectedId={year}
      onSelect={setYear}
      placeholder={year}
      /> */}

      <View className='items-center justify-center'>
        <SelectDropdown
        options={categories.map(cat=>({
          id:cat.id,
          name:cat.name,
          color:cat.color
        }))}
        selectedId={categoryId}
        onSelect={setCategoryId}
        placeholder="Select Category"
        />
      </View>

      <ButtonNeed
      onPress={handleSubmit}
      text={submitText}
      disabled={loading}
      loading={loading}
      style={{}}/>
      
      </View>
    </ModalComp>
   
  )
}

export default BudgetModel