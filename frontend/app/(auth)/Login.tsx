import { View, Text, ActivityIndicator, Pressable,Alert, Platform } from 'react-native'
import {useEffect,useState} from 'react'
import { useRouter } from 'expo-router'
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import { makeRedirectUri } from 'expo-auth-session';
import { useAuth } from '@/hooks/useAuth'
import { useAuthContext } from '@/context/AuthContext'
import { getAccessToken } from '@/services/tokenStorage'

WebBrowser.maybeCompleteAuthSession()

const login = () => {

  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const {loginCodeHook,loginTokenHook}=useAuth()
  const {loadUser,setUser}=useAuthContext()

  const isWeb = Platform.OS === 'web';

 const REDIRECT_URI = isWeb 
    ? 'http://localhost:8081' 
    : 'https://auth.expo.io/@evo-ash/FinSon';


  const [webRequest, webResponse, webPromptAsync] = Google.useIdTokenAuthRequest({
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  redirectUri:REDIRECT_URI,
  scopes: ['openid', 'profile', 'email']
});

const [nativeRequest, nativeResponse, nativePromptAsync] = Google.useAuthRequest({
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  redirectUri:REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  usePKCE: true,
});

  const request=isWeb?webRequest:nativeRequest
  const response=isWeb?webResponse:nativeResponse
  const promptAsync=isWeb?webPromptAsync:nativePromptAsync


  useEffect(()=>{


    if (response?.type==="success"){
      if(isWeb){

        const {id_token}=response.params

        console.log("web tokenId:", id_token)
        if(id_token){
          loginWithGoogle(id_token)
        }else{
          console.log('Full response:',JSON.stringify(response,null,2))
          Alert.alert('Error',"Could not get ID token from google")
        }
      }else{
        const {code}=response.params
      console.log("Native code:", code)

      if(code){
         loginWithGoogleCode(code,request?.codeVerifier)
      }
      }
    
    }

    if(response?.type==="error"){
      Alert.alert("Google login failed",response.error?.message || "Please try again.")
    }

  },[response])


  useEffect(() => { 
  if (request) {
    console.log('Platform:', Platform.OS)
    console.log('useProxy:',!isWeb)
    console.log("actual redirect URI:", request.redirectUri)
  }
}, [request])

const loginWithGoogle=async(idToken:string)=>{
  try{
    setLoading(true)

    const res=await loginTokenHook(idToken)
    console.log("success on web:", res)
    console.log("success on web user:",res.user)

    if(res.user){
      setUser(res.user)
    }
    router.replace("/(tabs)/home")
  }catch(err:any){
    Alert.alert("login failed with web:",err.message)
  }finally{
    setLoading(false)
  }
}

const loginWithGoogleCode=async(code:string,codeVerifier?:string)=>{
    try{
      setLoading(true)
      console.log("sending idToken to backend:", code)

      const res=await loginCodeHook({
        code,
        codeVerifier:codeVerifier || "",
        redirectUri:REDIRECT_URI
      })


      // await loadUser()

    console.log("success on android:", res)
    console.log("success on android user:",res.user)


    if(res.user){
      setUser(res.user)
    }

      router.replace("/(tabs)/home")
    }catch(err:any){
      console.log("status:",err?.response?.status)
      console.log("data:",err?.response?.data)
      

      Alert.alert("Login failed",err.message || "Something went wront. Please try again.")
    }finally{
      setLoading(false)
    }
  }

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
        disabled={!request || loading}
        onPress={() => promptAsync({showInRecents:false})}
        style={{
          height: 54,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#D9E2EF",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          opacity: !request || loading ? 0.6 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#208AEF" />
        ) : (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Continue with Google
          </Text>
        )}
      </Pressable>
    </View>
  );
}

export default login