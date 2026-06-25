import { View, Text, TextInput } from 'react-native'
import React, { useState,useEffect} from 'react'
import { TextData } from '../comps/TextData'
import { SelectType } from '../comps/Mode/ModalComp'
import SelectDropdown from '../comps/SelectDropdown'
import { ButtonNeed } from '../comps/ButtonNeed'
import ErrorPopUp from '../comps/ErrorPopUp'

type budgetModalProps={
  initialValues?:Partial<createBudgetProps>
  error:string | null
  loading:boolean
  categories:Category[]
  onSubmit:(values:createBudgetProps)=>Promise<void>
  submitText:string
}
const BudgetModel = ({initialValues,error,loading,categories,onSubmit,submitText}:budgetModalProps) => {

  const [amount,setAmount]=useState(initialValues?.amount?? "")
  const [month,setMonth]=useState(initialValues?.month ?? "")
  const [year,setYear]=useState(initialValues?.year ?? "")

  const [categoryId,setCategoryId]=useState(initialValues?.categoryId ?? '')

  useEffect(()=>{
    if(initialValues){
      setAmount(initialValues.amount ?? "")
      setMonth(initialValues.month?? "")
      setYear(initialValues.year?? "")
      setCategoryId(initialValues?.categoryId ?? "")
    }
  },[initialValues])

  const handleSubmit=async()=>{
    await onSubmit({amount,month,year,categoryId})
  }

  return (
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

      <TextData
      tag={''}
      placeholder={'Select a month'}
      value={month}
      onChangeText={setMonth}
      secureTextEntry={false}
      tagexist={false}
      keyboardType="default"
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
  )
}

export default BudgetModel