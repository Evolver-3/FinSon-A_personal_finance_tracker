import { View, Text ,TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/Authbody'
import { useAuthContext } from '@/context/AuthContext'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import { TextData } from '@/components/comps/TextData'

const signInPage = () => {

  const {login,error,loading}=useAuth()
  const {loadUser}=useAuthContext()

  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  
  const [localError,setLocalError]=useState("")

  const handleSubmit=async()=>{

     if(!email.trim() || !password.trim()){
      setLocalError("Empty fields")
      return
    }

    setLocalError("")

    try{
 
    const success=await login({email,password})

    if(success){
      await loadUser()
        router.replace("/(tabs)/home") 
    }
    
    }catch(err:any){
      throw err
    }
  }
  
  useEffect(()=>{
    if(localError){
      const timer=setTimeout(() => {
        setLocalError("")
      }, 2000);
      return ()=>clearTimeout(timer)
    }
  },[localError])

  const errorMessage=localError || error

  return (
    <Wrapper loading={false}>
    
    <Authbody errorMessage={errorMessage}
    headingText={"Signed in your account"}>
      <View className=' gap-y-4'>
        
        <TextData
        tagexist
        keyboardType="email-address"
        tag='Your email address'
        value={email}
        placeholder='arunlal@gmail.com'
        onChangeText={setEmail}
        secureTextEntry={false}/>

        <TextData
        tagexist
        keyboardType="visible-password"
        tag='Enter your password'
        value={password}
        placeholder='password'
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
        style={{}}
        loading={loading}
        disabled={loading}
        text={"Sign in"} onPress={handleSubmit}/>
            
         <View className='flex-row  '>
            <Text className='text-neutral-100 text-sm'>
              Don't have an account? </Text> 
             
               <Link href={"/(auth)/sign-up"} asChild>
               <Pressable>
                  <Text className='text-blue-500 text-sm'> Sign Up</Text>
                  </Pressable>
                </Link>
              
          </View>

      </View>
    </Authbody>

    </Wrapper>
    
  )
}

export default signInPage



