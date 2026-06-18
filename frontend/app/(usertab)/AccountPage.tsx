import { View, Text, FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useAccount } from '@/hooks/useAccount'
import CreateAccount from '@/components/account/CreateAccount'
import AccountItem from '@/components/account/AccountItem'
import { categorydynamicColors } from '@/data'
import HeaderList from '@/components/comps/Flat/HeaderList'

const AccountPage = () => {
  const {loading,error,creatingAccount,accounts,editAccount,removeAccount,  selectedAccount}=useAccount()
  
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

      await creatingAccount ({name,type,color,icon,balance})
      setName("")
      setColor(categorydynamicColors[0])
      setOpenCreate(false)
      setBalance("0")
      
    }catch(err:any){
      console.log(error)
      console.log(err)

    }finally{
      setPageLoad(false)
    }
  }

  console.log("Ui render:",accounts)
  return (
    <Wrapper loading={false}>
      
      <CreateAccount
      error={error}
      openCreate={openCreate}
      setOpenCreate={setOpenCreate}
      loading={pageLoad}
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
      contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10}}

      ListHeaderComponent={
        <HeaderList
        headingText={"Add New Accounts"}
        onPress={()=>setOpenCreate(true)}
        inlineText={"Search Accounts ..."}/>
      }

      ListEmptyComponent={
        <View className='px-4'>
          <Text style={{color:"#ffffff"}}>Add Account</Text>
        </View>
      }
      renderItem={({item})=>(
        <AccountItem
        error={error}
        item={item}
        loading={pageLoad}
        selectedAccount={selectedAccount}
        editAccount={editAccount}
        removeAccount={removeAccount}/>
      )}
      />
    </Wrapper>
  )
}

export default AccountPage