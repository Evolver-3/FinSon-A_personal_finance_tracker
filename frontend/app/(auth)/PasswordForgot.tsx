import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/Authbody'
import { ButtonNeed, TextData } from './sign-in'
import { Link, router } from 'expo-router'
import Wrapper from '@/components/WrapperPage'

const PasswordForgot = () => {
   const [errorMessage,setErrorMessage]=useState<string>("")
   const [email,setEmail]=useState<string>("")
   const [loading,setLoading]=useState(false)

  const {sendForgotPasswordEmail}=useAuth()

  const handleRecoveryEmail=async()=>{
    setErrorMessage("")

    if(!email.trim()){
      setErrorMessage("Email is required")
      return
    }
    setLoading(true)

    const success=await sendForgotPasswordEmail(email)

    setLoading(false)

    if(success){
      setTimeout(() => {
        router.replace("/(auth)/PasswordReset")
      }, 500);
    }else{
      setErrorMessage("Invalid Email")
    }
  }
  return (
    <Wrapper>
      <Authbody errorMessage={errorMessage} headingText={"Send Password Reset email"}>
      <View>
        <TextData
        tag='Your email address'
        value={email}
        placeholder='arunlal@gmail.com'
        onChangeText={setEmail}
        secureTextEntry={false}
        />
        <ButtonNeed
        disabled={loading}
        onPress={handleRecoveryEmail}
        text={"Get recovery mail"}/>
      </View>

    </Authbody>
    </Wrapper>
  )
}

export default PasswordForgot