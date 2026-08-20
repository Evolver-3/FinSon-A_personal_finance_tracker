import { useAuth, useSSO} from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import { useRouter } from 'expo-router'
import {View, Text, Pressable, ActivityIndicator, Platform} from 'react-native'
import{ useState } from 'react'
import { useAuthHook } from '@/hooks/useAuthHook'
import * as Linking from 'expo-linking'
import { setAuthToken } from '@/services/setAuthToken'
import {useGuest} from '@/hooks/useGuest'

WebBrowser.maybeCompleteAuthSession()

const Login = () => {
  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const {getToken}=useAuth()
  const {startSSOFlow}=useSSO()
  const {syncBackendHook,setBackendUser}=useAuthHook()

  const {enterGuestMode}=useGuest()


  const redirectUrl=Linking.createURL("sso-callback")

  const handleLogin=async()=>{
    try{
      setLoading(true)
      const {createdSessionId, setActive}=await startSSOFlow({
        strategy:'oauth_google',
        redirectUrl
      })
      console.log("Clerk redirectUrl:", redirectUrl)

      if(createdSessionId && setActive){
        await setActive({session:createdSessionId})
      }

      const token=await getToken()

      if(!token){
        return null
      }

      await setAuthToken(token)
      console.log("token in the setAuthtoken")

      const syncedUser=await syncBackendHook(token)
      if(!syncedUser){
        throw new Error("Backend user synced failed")
      }
      console.log("What is the created user synced:", syncedUser)
      setBackendUser(syncedUser)
    
      console.log("now routing to home page")

      router.replace("/(tabs)/home")
    }catch(err:any){
      console.log('SSo Error:', err.message)

    }finally{
      setLoading(false)
    }
  }


 const handleGuest = async () => {
  console.log("Guest button clicked");

  await enterGuestMode();

  console.log("navigating home now");

  router.replace("/(tabs)/home");
};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: "#F8FBFF",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          color: "#152033",
          marginBottom: 10,
        }}
      >
        Welcome to FinSon
      </Text>

      <View>
        <Text
        style={{
          fontSize: 15,
          color: "#64748B",
          marginBottom: 38,
        }}
      >
        Sign in to manage your finances.
        </Text>

        <Pressable
          disabled={ loading}
          onPress={handleLogin}
          style={{
            height: 54,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#D9E2EF",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            opacity:  loading ? 0.6 : 1,
            }}>
              
            {loading ? (
              <ActivityIndicator color="#208AEF" />
              ) : (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#334155",
                }}>
                Continue with Google
              </Text>
              )}
        </Pressable>
      </View>

      <View>
        <Pressable 
        style={{
            height: 54,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#D9E2EF",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            opacity:  loading ? 0.6 : 1,
            }}
        onPress={handleGuest}>
        <Text
        style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#334155",
                }}> Check guest mode</Text>
        </Pressable>
      </View>


    </View>
  )
}

export default Login