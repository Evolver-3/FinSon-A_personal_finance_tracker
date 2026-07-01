import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { router, useLocalSearchParams } from 'expo-router'
import Wrapper from '@/components/WrapperPage'
import Authbody from '@/components/comps/Authbody'
import { TextData } from '@/components/comps/TextData'
import { ButtonNeed } from '@/components/comps/ButtonNeed'

const PasswordReset = () => {

  const {resetUserPassword}=useAuth()
  const {token}=useLocalSearchParams<{token:string}>()

  const [errorMessage,setErrorMessage]=useState<string>('')
  const [loading,setLoading]=useState(false)
  const [newPassword,setNewPassword]=useState<string>("")
  const [confirmNewPassword,setConfirmNewPassword]=useState<string>("")

  const handleResetPassword=async()=>{
    setErrorMessage("")
    
    if(!token){
      setErrorMessage("Invalid reset Link")
      return
    }

    if(!newPassword.trim()|| !confirmNewPassword.trim()){
      setErrorMessage("Empty fields")
      return
    }

    if(confirmNewPassword!== newPassword){
      setErrorMessage("Both password should be same")
      return
    }
    setLoading(true)

    const success=await resetUserPassword(token,{
      newPassword,confirmNewPassword
    })

    if(success){
      setTimeout(() => {
        router.replace("/(auth)/sign-in")
      },200);
    }else{
      setErrorMessage("Something went wrong")
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
    <Wrapper loading={false}>
      <Authbody headingText={"Enter a new password"} errorMessage={errorMessage}>
        <View>
          <TextData
            tag='Your New password'
            value={newPassword}
            placeholder='password'
            onChangeText={setNewPassword}
            secureTextEntry={true}
            tagexist
            keyboardType='visible-password'/>

          <TextData
            tag='Confirm new password'
            value={confirmNewPassword}
            placeholder='password'
            onChangeText={setConfirmNewPassword}
            secureTextEntry={true}
            keyboardType='visible-password'
            tagexist
            />

            <ButtonNeed
            loading={loading}
            style={{}}
            disabled={loading}
            onPress={handleResetPassword}
            text={'Password change'}/>

        </View>
      </Authbody>
    </Wrapper>
  )
}

export default PasswordReset