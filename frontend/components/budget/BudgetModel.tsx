import { View} from 'react-native'
import React, { useState,useEffect, useCallback} from 'react'
import { TextData } from '../comps/TextData'
import ModalComp from '../comps/Mode/ModalComp'
import SelectDropdown from '../comps/SelectDropdown'
import { ButtonNeed } from '../comps/ButtonNeed'
import ErrorPopUp from '../comps/ErrorPopUp'
import { monthData } from '@/data'
import { useFocusEffect } from "@react-navigation/native";

type onSubmitBudget={
  amount:number
  month:number 
  year:number 
  categoryId:string
}

type budgetModalProps={
  initialValues?:Partial<createBudgetProps>
  error:string | null
  loading:boolean
  categories:Category[]
  onSubmit:(values:onSubmitBudget)=>Promise<void>
  submitText:string
  openModal:boolean 
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  viewFlex:number 
  pressableFlex:number
}


const BudgetModel = ({initialValues,error,loading,categories,onSubmit,submitText,openModal,setOpenModal,viewFlex,pressableFlex}:budgetModalProps) => {

  const [amount,setAmount]=useState(initialValues?.amount?.toString()?? "")
  const [month,setMonth]=useState(initialValues?.month?.toString() ?? "")
  const [year,setYear]=useState(initialValues?.year?.toString() ?? "")

  const [categoryId,setCategoryId]=useState(initialValues?.categoryId ?? '')
 
  useEffect(()=>{
    if(initialValues){
      setAmount(initialValues.amount?.toString() ?? "")
      setMonth(initialValues.month?.toString() ?? "")
      setYear(initialValues.year?.toString() ?? "")
      setCategoryId(initialValues?.categoryId?.toString() ?? "")
    }
  },[initialValues])

  const handleSubmit=async()=>{
    await onSubmit({amount:parseFloat(amount),month:parseInt(month),year:parseInt(year),categoryId})

    setAmount("")
    setMonth("")
    setYear("")
    setCategoryId("")

    setOpenModal(false)
  }


  return (

    <ModalComp
    visible={openModal}
    onRequestClose={()=>setOpenModal(false)}
    textblock={"New budget"}
    viewFlex={viewFlex}
    pressableFlex={pressableFlex}>

       <View className='flex-col gap-y-5 mt-10 relative'>

      <ErrorPopUp
      errorMessage={error }/>

      <TextData
      tag={''}
      placeholder={'Enter any amount'}
      value={amount}
      onChangeText={setAmount}
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

      <TextData
      tag={''}
      placeholder={'Select a year'}
      value={year}
      onChangeText={setYear }
      secureTextEntry={false}
      tagexist={false}
      keyboardType="default"
      />

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