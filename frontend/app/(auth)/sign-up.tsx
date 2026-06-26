import { View, Text, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react'
import Wrapper from '@/components/WrapperPage'
import { Link, router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/comps/Authbody'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import { TextData } from '@/components/comps/TextData'

const signUpPage = () => {
  const {register,error}=useAuth()
  
  const [email,setEmail]=useState<string >("")
  const [password,setPassword]=useState<string>("")
  const [username,setUsername]=useState<string>("")
  const [localErrorMessage,setLocalErrorMessage]=useState<string>("")
  const [loading,setLoading]=useState(false)

  const [submitAttempt,setSubmitAttempt]=useState(false)
  const emailError=submitAttempt && !email.trim()
  const passwordError=submitAttempt && !password.trim()
  const usernameError=submitAttempt && !username.trim()


  const handleSubmit=async()=>{
    
    setSubmitAttempt(true)
    setLocalErrorMessage("")

    if(!email.trim() || !password.trim() || !username.trim()){
      setLocalErrorMessage("fields are empty")
      return
    }

    setLoading(true)

    try{
      const success=await register({email,name:username,password})

    if(success){
     router.replace("/(auth)/sign-in")
    }

    }catch(err:any){
      const message=err?.response?.data?.message || err?.message || "Failed to sign in"
      setLocalErrorMessage(message)
      
    }finally{
      setLoading(false)
    }
       
  }

  useEffect(()=>{
      if(localErrorMessage){
        const timer=setTimeout(() => {
          setLocalErrorMessage("")
        }, 3000);
        return ()=>clearTimeout(timer)
      }
    },[localErrorMessage])

  useEffect(()=>{
      if(submitAttempt){
        const timer=setTimeout(() => {
          setSubmitAttempt(false)
        }, 3000);
        return ()=>clearTimeout(timer)
      }
    },[submitAttempt])


  return (
    <Wrapper loading={false}>
      <Authbody errorMessage={localErrorMessage}
      headingText={"Create a new account"}>
        <View className=' gap-y-4'>
            
            <TextData
            tagexist
            errorType={emailError}
            keyboardType="email-address"
            tag='Your email address'
            value={email}
            placeholder='your email'
            onChangeText={setEmail}
            secureTextEntry={false}
            />

            <TextData
            tagexist
            errorType={usernameError}
            keyboardType="default"
            tag='Your Username'
            value={username}
            placeholder='username'
            onChangeText={setUsername}
            secureTextEntry={false}
            />

            <TextData
            tagexist
            errorType={passwordError}
            keyboardType="default"
            tag='Enter your password'
            value={password}
            placeholder='password'
            onChangeText={setPassword} 
            secureTextEntry={true}
            />
            
            <ButtonNeed
            style={{}}
            loading={loading}
            disabled={loading}
            text={"Sign in"} onPress={handleSubmit}/>

            <View className='flex-row'>
              <Text className='smallText text-sm'>Don't have an account? </Text>
            
              <Link href={"/(auth)/sign-in"} asChild>
              <Pressable>
                <Text className='text-blue-500 text-sm'>Sign In</Text>
                </Pressable>
              </Link>
            
            </View>
            
           </View>
      </Authbody>
    </Wrapper>
    
  )
}

export default signUpPage





