import { View, Text, FlatList, Pressable} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { useAccount } from '@/hooks/useAccount'
import CreateAccount from '@/components/account/CreateAccount'
import { Plus } from 'lucide-react-native'
import AccountItem from '@/components/account/AccountItem'
import { categorydynamicColors } from '@/data'

const AccountPage = () => {
  const {loading,error,createAccount,accounts,editAccount,removeAccount}=useAccount()
  
  const [openCreate,setOpenCreate]=useState(false)

 
  const [name,setName]=useState("")
  const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
  const [icon,setIcon]=useState<string | null>(null)
  const [type,setType]=useState <"CASH" | "BANK" | "CARD" | "WALLET">("CASH")
  const [balance,setBalance]=useState("")

  const [pageLoad,setPageLoad]=useState(false)

  const handleCreateAccount=async()=>{
    try{
      setPageLoad(true)

      await createAccount ({name,type,color,icon,balance})
      setName("")
      setColor(categorydynamicColors[0])
      setOpenCreate(false)
      

    }catch(error){
      console.log(error)

    }finally{
      setPageLoad(false)
    }
  }

  console.log(accounts)
  return (
    <Wrapper>
      
      <CreateAccount
      openCreate={openCreate}
      setOpenCreate={setOpenCreate}
      loading={loading}
      handleCreateAccount={handleCreateAccount}
      name={name}
      setName={setName}
      type={type}
      setType={setType}
      color={color}
      setColor={setColor}
      icon={icon}
      setIcon={setIcon}
      balance={balance}
      setBalance={setBalance}
      />

      <FlatList
      data={accounts}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{paddingHorizontal:8,paddingTop:4,gap:10}}
      ListHeaderComponent={
        <View style={{gap:16,marginBottom:8}}>
          <View style={{
            flexDirection:"row",
            borderWidth:1,
            borderColor:"#737373",
            borderRadius:8,
            padding:8,
            gap:16,
            flexGrow:1
          }}>
            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'200'}}>Search Account..</Text>
          </View>

          <Pressable
          style={{
            borderRadius:8,
            padding:8,
            backgroundColor:"#525252"
          }}
          onPress={()=>setOpenCreate(true)}>
            <Plus color="#ffffff" size={20}/>
          </Pressable>
        </View>
      }

      ListEmptyComponent={
        <View>
          <Text style={{color:"#ffffff"}}>Add Accoun/t</Text>
        </View>
      }
      renderItem={({item})=>(
        <AccountItem
        item={item}
        editAccount={editAccount}
        removeAccount={removeAccount}/>
      )}
      />
    </Wrapper>
  )
}

export default AccountPage