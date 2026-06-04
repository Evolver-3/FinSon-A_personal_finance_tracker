import { View, Text, KeyboardAvoidingView, Platform, ScrollView,TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/Authbody'

const signInPage = () => {

  const {login,loading}=useAuth()
  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [errorMessage,setErrorMessage]=useState<string>("")

  const handleSubmit=async()=>{

    setErrorMessage("")

    if(!email.trim() || !password.trim()){
      setErrorMessage("Empty fields")
      return
    }

    const success=await login({email,password})

    if(success){
      setTimeout(() => {
        router.replace("/(tabs)")
      }, 500);
    }else{
      setErrorMessage("Wrong credentials")
    }
  }
  
  useEffect(()=>{
    if(errorMessage){
      const timer=setTimeout(() => {
        setErrorMessage("")
      }, 2000);
      return ()=>clearTimeout(timer)
    }
  })

  return (
    <Wrapper>
    
    <Authbody errorMessage={errorMessage}
    headingText={"Signed in your account"}>
      <View className=' gap-y-4'>
        
        <TextData
        tag='Your email address'
        value={email}
        placeholder='arunlal@gmail.com'
        onChangeText={setEmail}
        secureTextEntry={false}/>

        <TextData
        tag='Enter your password'
        value={password}
        placeholder='sduw48rw'
        onChangeText={setPassword}
        secureTextEntry={true}/>

        <Pressable>
          <Link href={'/(auth)/PasswordForgot'}>
            <Text className='text-blue-400 text-sm'>
              Forgot password
            </Text>
          </Link>
        </Pressable>

        <ButtonNeed text={"Sign in"} onPress={handleSubmit}/>
            
         <View className='flex-row  '>
            <Text className='text-neutral-100 text-sm'>
              Don't have an account? </Text> 
             <Pressable>
               <Link href={"/(auth)/sign-up"}>
                  <Text className='text-blue-500 text-sm'> Sign Up</Text>
                </Link>
              </Pressable>
          </View>

      </View>
    </Authbody>

    </Wrapper>
    
  )
}

export default signInPage


type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
  secureTextEntry:boolean
  
}

export const TextData=({tag,value,placeholder,onChangeText,secureTextEntry}:dataProps)=>{
  return(
    <View className=''>
      <View className='flex gap-y-2'>
        <Text className='text-md font-semibold text-neutral-300 text-dm '>{tag}</Text>
        <TextInput
        className='rounded-xl bg-neutral-900 p-3 placeholder:text-xs text-neutral-200'
        placeholderTextColor={"#6D6664"}
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}/>
      </View>
    </View>
  )
}

type buttonNeedProps={
  onPress:()=>void
  text:string
}

export const ButtonNeed=({onPress,text}:buttonNeedProps)=>{
  return(
    <Pressable
      onPress={onPress}
      className='items-center justify-center'>
        <Text className='text-center mt-4 py-3 rounded-xl w-4/5  bg-neutral-900  text-white text-md border border-neutral-600'>
          {text}
        </Text>
    </Pressable>
  )
}