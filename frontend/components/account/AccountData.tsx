import { View, Text, ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { TextData } from '../comps/TextData'
import { AccountIcons, categorydynamicColors } from '@/data'
import { ButtonNeed } from '../comps/ButtonNeed'
import ModalComp, { SelectAccountIcon, SelectColors, SelectType } from '../comps/Mode/ModalComp'
import ErrorPopUp from '../comps/ErrorPopUp'

const AccountData = ({initialValues,error,setError,loading,onSubmit,submitText,openModal,setOpenModal,viewFlex,pressableFlex}:AccountDataProps) => {

    const [name,setName]=useState(initialValues?.amount?.toString()?? "")
    const [balance,setBalance]=useState(initialValues?.month?.toString() ?? "")
    const [color,setColor]=useState<string>(initialValues?.color ??categorydynamicColors[0].btncolor)
    const [icon,setIcon]=useState<string | null>(initialValues?.icon ??null)
    const [type,setType]=useState <"CASH" | "BANK" | "CARD" | "WALLET">(initialValues?.type ??"CASH")

   
    useEffect(()=>{
      if(initialValues){
        setName(initialValues?.name ?? "")
        setBalance(initialValues?.balance ?? "")
        setIcon(initialValues?.icon ?? null)
        setType(initialValues?.type ?? "CASH")
        setColor(initialValues?.color ?? categorydynamicColors[0]?.btncolor )
      }
    },[initialValues])
  
    const handleBalanceChange=(text:string)=>{
          const amountNeeded=text.replace(/[^0-9.]/g, "")
  
          if(/^\d*\.?\d{0,2}$/.test(amountNeeded)){
            setBalance(amountNeeded)
          }
        }
  
    const handleSubmit=async()=>{
      if(!name ||!balance||!type ||!icon|| !color){
        setError("All entries are not filled")
        return        
      }
      await onSubmit({
        name,balance,type,icon,color
      })
  
      setBalance("")
      setName("")
      setType("CASH")
      setIcon(null)
      setColor(categorydynamicColors[0].btncolor)
  
      setOpenModal(false)
    }

    useEffect(()=>{
      const timer=setTimeout(()=>{
        setError(null)
      },3000)
      return()=>clearTimeout(timer)
    },[])

  return (
    <ModalComp
   visible={openModal}
   onRequestClose={()=>setOpenModal(false)}
   textblock={'Create Account'}
   pressableFlex={pressableFlex}
    viewFlex={viewFlex}>
  
  <View className='flex-col gap-y-5 mt-5 relative'>
    <ErrorPopUp
      errorMessage={error}/>

    <TextData
    keyboardType="default"
      tagexist={false}
      tag={''}
      value={name}
      placeholder='CNB' 
      onChangeText={setName}
      secureTextEntry={false}/>

    <TextData
    keyboardType="decimal-pad"
    tagexist={false}
    tag={''}
    value={balance}
    placeholder='0.00'
    onChangeText={handleBalanceChange}
    secureTextEntry={false}/>
    
    <View className='items-center justify-center mt-3'>
      <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-50  dark:bg-neutral-600 rounded-xl">

        <SelectType
        focused={type==="CARD"}
        onPress={()=>setType("CARD")}
        text='Card'/>
       
        <SelectType
        focused={type==="BANK"}
        onPress={()=>setType("BANK")}
        text='Bank'/>
                    
        <SelectType
        focused={type==="CASH"}
        onPress={()=>setType("CASH")}
        text='Cash'/>
                  
        <SelectType
        focused={type==="WALLET"}
        onPress={()=>setType("WALLET")}
        text='Wallet'/>

      
    </View>
                  
      </View>
       
      <View className=' flex-row gap-x-3 mt-2 items-center'>
        <Text className='text-md font-semibold text-white'>Choose Color</Text>
        
        <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerClassName='items-center'
        className='flex-row'
        contentContainerStyle={{alignItems:"center",gap:10}}>
          
          {categorydynamicColors.map((col,id)=>(
            <View key={id}>
              <SelectColors
                style={{
                  backgroundColor:col.btncolor
                }}
                focused={color===col.btncolor}
                onPress={()=>setColor(color)}/>
            </View>))}
        </ScrollView>
      </View>
    
      <View className='flex-row items-center justify-between '>
        {AccountIcons.map((tag)=>(
          <SelectAccountIcon
          style={{}}
          key={tag.id}
          name={tag.name}
          icon={tag?.name}
          focused={icon===tag.name}
          onPress={()=>setIcon(tag.name)}/>))}
      </View>
      <ButtonNeed
        style={{}}
        onPress={handleSubmit}
        text={submitText}
        loading={loading}
        disabled={loading}/>
      
      </View>
   </ModalComp>
  )
}

export default AccountData