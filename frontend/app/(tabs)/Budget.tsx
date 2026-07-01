import { View, Text ,FlatList} from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { useBudget } from '@/hooks/useBudget'
import CreateBudget from '@/components/budget/CreateBudget'
import { useCategory } from '@/hooks/useCategory'
import RenderBudget from '@/components/budget/RenderBudget'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { monthData } from '@/data'


const Budget = () => {

  const {creatingNewBudget,loading,budgets,spendingBudget}=useBudget()
  const {categories}=useCategory()
  const [pageError,setPageError]=useState("")
  const [pageLoad,setPageLoad]=useState(false)
  const [query,setQuery]=useState('')
  const [openModal,setOpenModal]=useState(false)

  const monthlyBudget=(monthNumber:number)=>{
    return monthData.find((item)=>Number(item.id)===monthNumber)?.month ?? ""
  }

  console.log(monthlyBudget(5))

   const filteredData=budgets.filter(item=>{
    const searchable=monthlyBudget(item.month) ?? String(item.year)
    return searchable.toLowerCase().includes(query.toLowerCase())
  })

  const getRemainingPerMonth=budgets.reduce((total,item)=>{
      return total+ Number(item.remaining??0)
    },0)

  const getSpendPerMonth=budgets.reduce((total,item)=>{
    return total+Number(item.spent ??0)
  },0)

  const getTotalPerMonth=budgets.reduce((total,item)=>{
    return total+Number(item.amount ?? 0)
  },0)
    
    return (
    <Wrapper loading={false}>
  
      <CreateBudget
      creatingNewBudget={creatingNewBudget}
      loading={loading}
      categories={categories}
      pageLoad={pageLoad}
      setPageLoad={setPageLoad}
      setPageError={setPageError}
      pageError={pageError}
      pressableFlex={2}
      viewFlex={6}
      openModal={openModal}
      setOpenModal={setOpenModal}/>

      <FlatList
      data={filteredData}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{
        paddingHorizontal:4,
        paddingTop:6,
        gap:10
      }}
      ListHeaderComponent={
        <View className='flex-col gap-y-4'>
          <HeaderList 
          setQuery={setQuery}
          headingText={'Add new Transactions'}
          inlineText={"Search transactions..."}
          onPress={()=>setOpenModal(true)}/>
          
          <View className="px-4 mb-4">
            <View className="rounded-lg py-6 px-4 mainbg mainborder flex-col gap-y-4"
          style={{
            elevation:2
          }}>
            <Text className='biggerText font-bold text-lg'>Monthly Budget Remains</Text>
            <Text className='smallText'>
              <Text className='font-semibold text-neutral-700 dark:text-neutral-200 text-[33px]'>{getRemainingPerMonth}</Text> 
              {"  "}remains of {getTotalPerMonth}</Text>

          </View>
          </View>
        </View>
        }
      ListEmptyComponent={
        <View className='px-4'>
          <Text className="smallText">Add budget</Text>
        </View>
        }
      renderItem={({item})=>(
        <RenderBudget
        item={item}
        spendingBudget={spendingBudget}/>
      )}
      />
        
  
    </Wrapper>
  )
}

export default Budget