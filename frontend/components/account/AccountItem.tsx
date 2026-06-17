import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { getIconByName } from '../comps/Mode/ModalComp'
import { Pencil } from 'lucide-react-native'
import UpdateAccount from './UpdateAccount'

type AccountItemProps={
  item:Account 
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  removeAccount:(id:string)=>Promise<void>
}
const AccountItem = ({item,editAccount,removeAccount}:AccountItemProps) => {
  const [openEdit,setOpenEdit]=useState(false)
  const [account,setAccount]=useState<Account| null>(null)
  return (
   <View className='px-4'>
         <View
           className='flex-row items-center rounded-xl p-4 '
             style={{
             backgroundColor:item.color.darkColor
             }}>
             <View className='flex-grow flex-row gap-x-4'>
               <View
               className='p-2 rounded-full shadow-sm'>
                 {getIconByName(item.icon,false)}
               </View>
       
               <View>
                 <Text className='text-sm text-white'>{item.name}</Text>
                 <Text className={`text-xs text-white font-extralight `}
                   style={{
                     color:`${item.color.colors}`
                   }}>{item.type}</Text>
               </View>
             </View>
       
             <Pressable
               onPress={()=>{
               console.log('pencil pressed', item.id)
               setOpenEdit(true)
               setAccount(item)}}>
               <Pencil
               color={'#000000'}
               size={18}/>
             </Pressable>
    
         </View>
   
         <UpdateAccount
         openEdit={openEdit}
         setOpenEdit={setOpenEdit}
         account={account}
         editAccount={editAccount}
         removeAccount={removeAccount}/>
                 
       </View>
  )
}

export default AccountItem