import { View, Text } from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import Authbody from '@/components/comps/Authbody'
import { Link, useLocalSearchParams } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { ButtonNeed } from '@/components/comps/ButtonNeed'

const CheckEmail = () => {
  
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState<string>("")
  const {email}=useLocalSearchParams<{email:string}>()
  const {resendVerificationEmail}=useAuth()

  const handleResend=async()=>{
    setErrorMessage("")
    try{
      setLoading(true)
      if(!email){
        setErrorMessage("Email is missing")
        return
      }

      const success=await resendVerificationEmail(email)
      

      if(success){
        setLoading(false)

      }else{
        setErrorMessage("Something went wrong")
      }
      
    }catch(error:any){
      setErrorMessage( "Could not resend email")

    }
  }
  return (
    <Wrapper loading={loading}>
      <Authbody headingText={""} errorMessage={errorMessage}>
        <View className='flex-1 items-center '>
          <Text>
            Check your email
          </Text>

          <Text>
            We sent a verification link to {email}
          </Text>

          <ButtonNeed
          style={{}}
          loading={loading}
          disabled={loading}
          onPress={handleResend}
          text={"Resend email"}/>

          <Link href="/(auth)/sign-in">
          <Text>Back to sign in</Text>
          </Link>
        </View>

      </Authbody>
    </Wrapper>
  )
}

export default CheckEmail