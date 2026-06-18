import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { useBudget } from '@/hooks/useBudget'

const Budget = () => {

  const {creatingNewBudget,fetchAllBudgets}=useBudget()
  return (
    <Wrapper loading={false}>
      <View className='flex-1 px-4 gap-y-4 pt-4'>
        <TopUserComp
        headingText={"Monthly budgets"}
        />

        <View className="">
          


        </View>
        
      </View>

    </Wrapper>
  )
}

export default Budget