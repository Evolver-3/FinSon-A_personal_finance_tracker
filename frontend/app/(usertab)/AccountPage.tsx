import { View, Text, FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useAccount } from '@/hooks/useAccount'
import CreateAccount from '@/components/account/CreateAccount'
import AccountItem from '@/components/account/AccountItem'
import { categorydynamicColors } from '@/data'
import HeaderList from '@/components/comps/Flat/HeaderList'
import FakePageAnimate from '@/components/comps/Animate/FakePageAnimate'

const AccountPage = () => {
  const {loading,error,creatingAccount,accounts,editAccount,removeAccount,  selectedAccount}=useAccount()
  
  const [openCreate,setOpenCreate]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
  const [icon,setIcon]=useState<string | null>(null)
  const [type,setType]=useState <"CASH" | "BANK" | "CARD" | "WALLET">("CASH")
  const [balance,setBalance]=useState("") 


  const [pageLoad,setPageLoad]=useState(false)

  const [query,setQuery]=useState("")

  const filteredData=accounts.filter(item=>{
    const searchable=item.name??''
    return searchable.toLocaleLowerCase().includes(query.toLowerCase())
  })

  const isInitiallyLoading=loading && accounts.length===0

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
      data={isInitiallyLoading ? [] :filteredData}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10}}

      ListHeaderComponent={
        <HeaderList
        setQuery={setQuery}
        headingText={"Add New Accounts"}
        onPress={()=>setOpenCreate(true)}
        inlineText={"Search Accounts ..."}/>
      }

      ListEmptyComponent={
        <FakeLoad 
        loading={isInitiallyLoading}
        hasAccounts={accounts.length>0}
        query={query}
        unmatchText='No matching accounts found'
        defaultText='Add an account'
        >
          {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
          <View key={item}
          className='w-full h-20 mainbg rounded-md'>
          </View>
        ))}
        </FakeLoad>
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


type fakeLoadProps={
  loading:boolean 
  hasAccounts:boolean 
  query:string
  children:React.ReactNode
  unmatchText:string 
  defaultText:string
}


export const FakeLoad=({loading,hasAccounts,query,children,unmatchText,defaultText}:fakeLoadProps)=>{
  if(loading){
    return(
      <FakePageAnimate>
        {children}
      </FakePageAnimate>
        
    )
  }
  if(hasAccounts && query.trim()){
    return(
      <View className="px-4">
        <Text className="text-sm smallText">{unmatchText}</Text>
      </View>
    )
  }

  return(
    <View className='px-4'>
      <Text className="text-sm smallText">{defaultText}</Text>
    </View>
  )
}