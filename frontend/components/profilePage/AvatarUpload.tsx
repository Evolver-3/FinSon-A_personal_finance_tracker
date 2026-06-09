import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useUser } from '@/hooks/useUser'
import { ImageUp, UserRound } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'
import Authbody from '../Authbody'

const AvatarUpload = () => {

  const {addingAvatar,user,fetchUserProfile}=useUser()

  const [errorMessage,setErrorMessage]=useState<string>("")
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchUserProfile()
  },[])

 const pickAvatar = async () => {
  try {
    setLoading(true)
    setErrorMessage("")

    //permission to access files in ios apps
    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(!permission.granted){
      setErrorMessage("Permission to access media library is required")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    })

    console.log("result:", result)
    
    if (result.canceled) return

    const asset = result.assets[0]
    console.log("asset:", asset.uri,asset.fileName, asset.mimeType)

    const formData = new FormData()

    formData.append("avatar", {
      uri: asset.uri,
      name: asset.fileName || "avatar.jpg",
      type: asset.mimeType || "image/jpeg",
    } as any)

    console.log("updating avatar.....")

    await addingAvatar(formData)
    console.log("update done:", user?.avatar)

  } catch (error: any) {
    setErrorMessage(
      error?.response?.data?.message ||
      error?.message ||
      "Failed to upload avatar")

      console.log("Full error:", JSON.stringify(error?.response?.data))

      console.log("Status:", error?.response?.status)
      console.log("Headers sent:", error?.config?.headers)
    
  } finally {
    setLoading(false)
  }
}

  return (

      <View className='bg-neutral-700 rounded-full flex-1 relative'
    style={{width:100,height:100}}>
      {user?.avatar ? (
        <Image source={{uri:user?.avatar as any}}
        style={{
          width:100,
          height:100,
          borderRadius:50
        }}/>
      ):(
        <UserRound size={100}/>
      )}

      <Pressable className='absolute bottom-0 right-0 bg-neutral-500 p-1 rounded-xl'
      onPress={pickAvatar}
      disabled={loading}>
       
         <ImageUp
        size={15} color={"#ffffff"}/>
      
      </Pressable>
      
      
    </View>
  )
}

export default AvatarUpload