import { View, Text, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/Authbody'
import { ButtonNeed, TextData } from './sign-in'

const signUpPage = () => {
  const {error,register,loading}=useAuth()
  
  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [username,setUsername]=useState<string>("")
  const [errorMessage,setErrorMessage]=useState<string>("")

  const handleSubmit=async()=>{
    
    setErrorMessage("")

    if(!email.trim() || !password.trim() || !username.trim()){
      setErrorMessage("fields are empty")
      return
    }

    const success=await register({email,name:username,password})

    if(success){
      setTimeout(() => {
        router.replace("/(auth)/sign-in")
      }, 500);
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
      headingText={"Create a new account"}>
        <View className=' gap-y-4'>
            
            <TextData
            tag='Your email address'
            value={email}
            placeholder='arunlal@gmail.com'
            onChangeText={setEmail}
            secureTextEntry={false}
            />

            <TextData
            tag='Your Username'
            value={username}
            placeholder='arun lal'
            onChangeText={setUsername}
            secureTextEntry={false}
            />

            <TextData
            tag='Enter your password'
            value={password}
            placeholder='Password'
            onChangeText={setPassword} 
            secureTextEntry={true}
            />
            
            <ButtonNeed text={"Sign in"} onPress={handleSubmit}/>

            <View className='flex-row'>
              <Text className='text-neutral-100 text-sm'>Don't have an account? </Text>
            <Pressable>
              <Link href={"/(auth)/sign-in"}>
                <Text className='text-blue-500 text-sm'>Sign In</Text>
              </Link>
            </Pressable>
            </View>
            
           </View>
      </Authbody>
    </Wrapper>
    
  )
}

export default signUpPage





