import { View, Text, KeyboardAvoidingView, Platform, ScrollView,TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link } from 'expo-router'

const signUpPage = () => {
  
  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [username,setUsername]=useState<string>("")

  return (
    <Wrapper>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios'?'padding':'height'}
      style={{flex:1}}>
        <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{flexGrow:1}}>
          <View className=' flex-1  px-4 my-10'>

            <Text className='text-2xl font-semibold text-neutral-100 leading-tight'
            numberOfLines={2}>SignUp to a new account</Text>
        
           <View className=' mt-10'>
           <View className=' gap-y-4'>
            
            <TextData
            tag='Your email address'
            value={email}
            placeholder='arunlal@gmail.com'
            onChangeText={setEmail}
            />

            <TextData
            tag='Your Username'
            value={username}
            placeholder='arun lal'
            onChangeText={setUsername}
            />

            <TextData
            tag='Enter your password'
            value={password}
            placeholder='sduw48rw'
            onChangeText={setPassword}
            />
            <View className=''>
              <Text className='text-blue-400 text-sm'>
                Forgot password
              </Text>
            </View>


            <Pressable
            className='flex-1 text-center bg-neutral-900 p-3 rounded-3xl mt-4 hover:ring-2 hover:ring- hover:scale-[98%] hover:rign-neutral-xl transition-all duration-300 ease-in-out hover:shadow-md
            '>
              <Text className='text-center text-white text-xs'>Sign Up</Text>
            </Pressable>

            <Text className='text-neutral-100 text-sm'>Don't have an account? 
              <Link href={"/(auth)/sign-in"}>
                <Pressable className='text-blue-500 hover:underline hover:underline-offset-2 hover:text-blue-600 '>
                 Sign In
                </Pressable></Link>
            </Text>
           </View>


           </View>
           
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
    
  )
}

export default signUpPage


type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
}

export const TextData=({tag,value,placeholder,onChangeText}:dataProps)=>{
  return(
    <View className=''>
      <View className='flex gap-y-2'>
        <Text className='text-md font-semibold text-neutral-300 text-dm '>{tag}</Text>
        <TextInput
        className='rounded-xl bg-neutral-900 ring-1 ring-offset-yellow-400 p-3 
        placeholder:text-neutral-200 placeholder:text-xs'
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}/>
      </View>
    </View>
  )
}
