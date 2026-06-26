import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'
import ErrorPopUp from './ErrorPopUp'

type authBodyProps={
  children: ReactNode
  errorMessage:string | null
  headingText:string 
}
const Authbody = ({children,errorMessage,headingText}:authBodyProps) => {
  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'?'padding':'height'}
          style={{flex:1}}>
            <ScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{flexGrow:1}}>
              <View className=' flex-1 px-4 mt-10'>
    
                <Text className='text-2xl font-semibold biggerText leading-tight'
                numberOfLines={1}>{headingText}</Text> 
            
               <View className=' mt-8 relative px-2'>
    
                <ErrorPopUp
                errorMessage={errorMessage}/>

                {children}

                </View>
                            
              </View>
                
            </ScrollView>
      </KeyboardAvoidingView>
  )
}

export default Authbody