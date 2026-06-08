import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { useTransaction } from '@/hooks/useTransaction'

const CreatingNewTransacton = () => {

  const {creatingNewTransaction,singleTransaction}=useTransaction()

  const [transaction,setTransaction]=useState<string | null>(null)

  return (
    <View>
      <Text>creatingNewTransacton</Text>
    </View>
  )
}

export default CreatingNewTransacton