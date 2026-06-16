import { View, Text } from 'react-native'
import React from 'react'

type AccountItemProps={
  item:Account 
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  removeAccount:(id:string)=>Promise<void>
}
const AccountItem = ({item,editAccount,removeAccount}:AccountItemProps) => {
  return (
    <View>
      <Text>AccountItem</Text>
    </View>
  )
}

export default AccountItem