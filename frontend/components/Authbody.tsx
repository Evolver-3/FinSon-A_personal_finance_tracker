import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { ReactNode } from 'react'

type authBodyProps={
  children: ReactNode
  errorMessage:string
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
              <View className=' flex-1  px-4 my-20'>
    
                <Text className='text-2xl font-semibold text-neutral-100 leading-tight'
                numberOfLines={1}>{headingText}</Text> 
            
               <View className=' mt-10 relative'>
    
                <View className='w-fit ml-auto absolute right-0 -top-5'>
                  {errorMessage && (
                  <Text className='text-md text-red-400 bg-red-200 rounded-xl px-3 border border-red-200'>{errorMessage}</Text>
                )}
                </View>

                {children}

                
                </View>
                           
              </View>
                
            </ScrollView>
      </KeyboardAvoidingView>
  )
}

export default Authbody