import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { useAuth } from '@/hooks/useAuth'
import Authbody from '@/components/comps/Authbody'

import { Link, router } from 'expo-router'
import Wrapper from '@/components/WrapperPage'
import { TextData } from '@/components/comps/TextData'
import { ButtonNeed } from '@/components/comps/ButtonNeed'

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
    <Wrapper loading={false}>
      <Authbody errorMessage={errorMessage} headingText={"Send Password Reset email"}>
      <View className='flex-col gap-y-6'>
        <TextData
        tag='Your email address'
        value={email}
        placeholder='arunlal@gmail.com'
        onChangeText={setEmail}
        secureTextEntry={false}
        tagexist
        keyboardType="email-address"

        />
        <ButtonNeed
        disabled={loading}
        loading={loading}
        style={{}}
        onPress={handleRecoveryEmail}
        text={"Get recovery mail"}/>
      </View>

    </Authbody>
    </Wrapper>
  )
}

export default PasswordForgot