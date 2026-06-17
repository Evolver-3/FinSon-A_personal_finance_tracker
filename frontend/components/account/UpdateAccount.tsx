import { View, Text, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AccountIcons, categorydynamicColors } from '@/data'
import ModalComp, { SelectColors, SelectIcon, SelectType } from '../comps/Mode/ModalComp'
import { TextData } from '../comps/TextData'
import { ButtonNeed } from '../comps/ButtonNeed'

type UpdateAccountProps={
  openEdit:boolean 
  setOpenEdit:React.Dispatch<React.SetStateAction<boolean>>
  account:Account | null
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  removeAccount:(id:string)=>Promise<void>
}
const UpdateAccount = ({openEdit,setOpenEdit,account,editAccount,removeAccount}:UpdateAccountProps) => {

   const [name,setName]=useState("")
      const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
      const [icon,setIcon]=useState<string | null>(null)
      const [type,setType]=useState <"CASH" | "BANK" | "CARD" | "WALLET">("CASH")
      const [balance,setBalance]=useState("")
      const [editPageLoading,setEditPageLoading]=useState(false)
      const [removePageLoading,setRemovePageLoading]=useState(false)
  
      const handleEditAccount=async()=>{
        try{
    
          setEditPageLoading(true)
          if(!account?.id)return
  
          console.log("Account clicked:",account)
          await editAccount(account?.id,{name,color,type,icon,balance})
  
          setOpenEdit(false)
        }catch(error){
          console.log(error)
        }finally{
          setEditPageLoading(false)
        }
      }

      const handledeleteAccount=async()=>{
        try{
          setRemovePageLoading(true)
          if(!account?.id)return

          console.log("Account chosen:", account)
          await removeAccount(account?.id)
          setOpenEdit(false)
          
        }catch(error){
          console.log(error)

        }finally{
          setRemovePageLoading(false)
        }
      }
  
      useEffect(()=>{
        if(account){
          setName(account.name ?? "")
          setColor(account.color ?? categorydynamicColors[0])
          setIcon(account.icon?? null)
          setType(account.type ?? "CASH")
          setBalance(account.balance ?? "0")
        
        }
      },[account]) 
  return (
   <ModalComp
   visible={openEdit}
   onRequestClose={()=>setOpenEdit(false)}
   textblock={'Create Account'}>
    <TextData
      tagexist={false}
      tag={''}
      value={name}
      placeholder='CNB' 
      onChangeText={setName}
      secureTextEntry={false}/>

    <TextData
    tagexist={false}
    tag={''}
    value={balance}
    placeholder='0'
    onChangeText={setBalance}
    secureTextEntry={false}/>
    
    <View className='items-center justify-center '>
      <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">

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
       
      <View className=' flex-row gap-x-3'>
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
                focused={color.btncolor===col.btncolor}
                onPress={()=>setColor(col)}/>
            </View>))}
        </ScrollView>
      </View>
    
      <View className='flex-row items-center justify-between '>
        {AccountIcons.map((tag)=>(
          <SelectIcon
          key={tag.id}
          name={tag.name}
          icon={tag?.name}
          focused={icon===tag.name}
          onPress={()=>setIcon(tag.name)}/>))}
      </View>
      <ButtonNeed
        style={{}}
        onPress={handleEditAccount}
        text={'Update'}
        loading={editPageLoading}
        disabled={editPageLoading}/>

        

        <ButtonNeed
        style={{}}
        onPress={handledeleteAccount}
        text={'Delete'}
        loading={removePageLoading}
        disabled={removePageLoading}/>
      
    </View>  
   </ModalComp>
  )
}

export default UpdateAccount