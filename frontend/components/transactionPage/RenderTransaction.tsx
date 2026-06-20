import { View, Text } from 'react-native'
import React from 'react'

type renderTransactionProps={
  item:Transaction
  loading:boolean 
  editTransaction:(id:string, data:updateTransactionProps)=>Promise<void>
  removeTransaction:(id:string)=>Promise<void>
}
const RenderTransaction = ({item,loading,editTransaction,removeTransaction}:renderTransactionProps) => {
  return (
    <View>
      <Text>RenderTransaction</Text>
    </View>
  )
}

export default RenderTransaction