import { View, Text, KeyboardAvoidingView, Platform, ScrollView,TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/Authbody'

const signInPage = () => {

  const {login}=useAuth()
  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [errorMessage,setErrorMessage]=useState<string>("")
  const [loading,setLoading]=useState(false)


  const handleSubmit=async()=>{

    setErrorMessage("")
    setLoading(true)

    if(!email.trim() || !password.trim()){
      setErrorMessage("Empty fields")
      return
    }

    const success=await login({email,password})

    if(success){
      setTimeout(() => {
        router.replace("/(tabs)")
      }, 500);
      setLoading(true)
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

        <ButtonNeed
        disabled={loading}
        text={"Sign in"} onPress={handleSubmit}/>
            
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

      <View className='flex gap-y-4'>
        <Text className='text-lg font-semibold text-neutral-400 text-dm '>{tag}</Text>
        <TextInput
        className='rounded-xl bg-neutral-900 p-5 text-md text-neutral-200 border border-neutral-700 '
        placeholderTextColor={"#6D6664"}
        autoCapitalize='none'
        value={value ?? ""}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}/>
      </View>

  )
}

type buttonNeedProps={
  onPress:()=>void
  text:string
  disabled:boolean
}

export const ButtonNeed=({onPress,text,disabled}:buttonNeedProps)=>{
  return(
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className='items-center justify-center mt-10'>
        <Text className='text-center  py-3 rounded-xl w-4/5  bg-neutral-900  text-white text-md border border-neutral-600'>
          {text}
        </Text>
    </Pressable>
  )
}