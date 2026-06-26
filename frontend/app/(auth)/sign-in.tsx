import { View, Text ,TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/comps/Authbody'
import { useAuthContext } from '@/context/AuthContext'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import { TextData } from '@/components/comps/TextData'

const signInPage = () => {

  const {login}=useAuth()
  const {loadUser}=useAuthContext()

  const [submitAttempt,setSubmitAttempt]=useState(false)

  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [localError,setLocalError]=useState("")

  const [loading,setLoading]=useState(false)
  
  const emailError=submitAttempt && !email.trim() 
  const passwordError=submitAttempt && !password.trim()


  const handleSubmit=async()=>{
    
    setSubmitAttempt(true)
    setLocalError("")
    
    if(!email.trim() && !password.trim()){
      setLocalError("Fields are empty")
      return
    }
    setLoading(true)

    try{
 
    const success=await login({email,password})

    if(success){
      await loadUser()
        router.replace("/(tabs)/home") 
    }

    }catch(err:any){
      
      const message=err?.response?.data?.message || err?.message || "Failed to sign in"

      setLocalError(message)

    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    if(localError ){
      const timer=setTimeout(() => {
        setLocalError("")
      }, 3000);
      return ()=>clearTimeout(timer)
    }
  },[localError])

  useEffect(()=>{
    if(submitAttempt){
      const timer=setTimeout(() => {
        setSubmitAttempt(false)
      }, 3000);
      return()=>clearTimeout(timer)
    }
  },[submitAttempt])


  return (
    <Wrapper loading={false}>
    
    <Authbody errorMessage={localError}
    headingText={"Signed in your account"}>
      <View className='flex-col gap-y-4 '>
        
        <TextData
        tagexist
        keyboardType="email-address"
        tag='Your email address'
        value={email}
        placeholder='your email'
        onChangeText={setEmail}
        secureTextEntry={false}
        errorType={emailError}/>

        <TextData
        tagexist
        keyboardType="default"
        tag='Enter your password'
        value={password}
        placeholder='password'
        onChangeText={setPassword}
        secureTextEntry={true}
        errorType={passwordError}/>

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
            <Text className='smallText text-sm'>
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



