import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { useUser } from '@/hooks/useUser'
import { ImageUp, UserRound } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'
import Authbody from '../Authbody'

const AvatarUpload = () => {

  const {addingAvatar,user}=useUser()

  const [errorMessage,setErrorMessage]=useState<string>("")
  const [loading,setLoading]=useState(false)

 const pickAvatar = async () => {
  try {
    setLoading(true)
    setErrorMessage("")

    //permission to access files in ios apps
    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(!permission){
      setErrorMessage("Permission to access media library is required")
      return
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    })

    if (result.canceled) return

    const asset = result.assets[0]

    const formData = new FormData()

    formData.append("avatar", {
      uri: asset.uri,
      name: asset.fileName || "avatar.jpg",
      type: asset.mimeType || "image/jpeg",
    } as any)

    console.log("avatar",user?.avatar)
    console.log("formData:", JSON.stringify(formData))
    
    console.log("asset:", asset.uri, asset.fileName, asset.mimeType)

    await addingAvatar(formData)

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
    <Authbody errorMessage={errorMessage}
    headingText={"Your Profile"}>
      <View className='bg-neutral-700 rounded-full flex-1 '
    style={{width:100,height:100}}>
      {user?.avatar ? (
        <Image source={{uri:user.avatar}}
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
       {loading ? (<ActivityIndicator size="small" />):(
         <ImageUp
        size={15} color={"#ffffff"}/>
       )}
      </Pressable>
      
      
    </View>
    </Authbody>
  )
}

export default AvatarUpload