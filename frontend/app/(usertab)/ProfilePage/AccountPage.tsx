import { View, Text, FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import { useAccount } from '@/hooks/useAccount'
import CreateAccount from '@/components/account/CreateAccount'
import AccountItem from '@/components/account/AccountItem'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { FakeLoad } from '@/components/comps/Animate/FakeLoad'
import { useTheme } from '@/hooks/useTheme'

const AccountPage = () => {
  const {loading,error,creatingAccount,accounts,editAccount,removeAccount,  selectedAccount}=useAccount()
  
  const [openCreate,setOpenCreate]=useState(false)

  const {isDark}=useTheme()

  const [pageLoad,setPageLoad]=useState(false)
  const [pageError,setPageError]=useState<string | null>("")
  const [query,setQuery]=useState("")

  const filteredData=accounts.filter(item=>{
    const searchable=item.name??''
    return searchable.toLocaleLowerCase().includes(query.toLowerCase())
  })

  const isInitiallyLoading=loading && accounts.length===0

  const newError=pageError || error
  return (
    <Wrapper loading={false}>
      
      <CreateAccount
      pageError={newError}
      pageLoad={pageLoad}
      creatingAccount={creatingAccount}
      openModal={openCreate}
      setOpenModal={setOpenCreate}
      setPageLoad={setPageLoad}
      setPageError={setPageError}
      />

      <FlatList
      data={isInitiallyLoading ? [] :filteredData}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{paddingHorizontal:4,paddingTop:6,gap:10}}

      ListHeaderComponent={
        <HeaderList
        pressableNeeded
        setQuery={setQuery}
        headingText={"Add New Accounts"}
        onPress={()=>setOpenCreate(true)}
        inlineText={"Search Accounts ..."}/>
      }

      ListEmptyComponent={
        <FakeLoad 
        loading={isInitiallyLoading}
        hasData={accounts.length>0}
        query={query}
        unmatchText='No matching accounts found'
        defaultText='Add an account'
        >
          {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
          <View key={item}
          className='w-full h-20 rounded-md'
          style={{
            backgroundColor:isDark?"#857A83":"#E3C1DE"
          }}>
          </View>
        ))}
        </FakeLoad>
      }
      renderItem={({item})=>(
        <AccountItem
        item={item}
        selectedAccount={selectedAccount}
        editAccount={editAccount}
        removeAccount={removeAccount}
       />
      )}
      />
    </Wrapper>
  )
}

export default AccountPage

