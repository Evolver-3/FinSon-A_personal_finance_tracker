import { View, Text, InputAccessoryView, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import ProfileWrap from '@/components/profilePage/ProfileWrap'
import AvatarUpload from '@/components/profilePage/AvatarUpload'
import { useUser } from '@/hooks/useUser'
import { ChevronRight, ImageUp, LayoutPanelTop, User, UserRound } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'

const UserProfile = () => {

   const {addingAvatar,backendUser,fetchUserProfile,loading}=useUser()
  
    const [errorMessage,setErrorMessage]=useState<string>("")
    const [errorLoading,setErrorLoading]=useState(false)
    const [userName,setUserName]=useState(backendUser?.name)
  
    useEffect(()=>{
      fetchUserProfile()
    },[])
  
   const pickAvatar = async () => {
    try {
      setErrorLoading(true)
      setErrorMessage("")
  
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
      console.log("update done:", backendUser?.avatar)
  
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to upload avatar")
    
    } finally {
      setErrorLoading(false)
    }
  }

  return (
    <ProfileWrap
     textValue='Edit profile'
     dataHasHref={false}
     >
      <View className='flex flex-col items-center pt-6 gap-y-7'>
        <AvatarUpload
        user={backendUser}
        loading={loading}
        pickAvatar={pickAvatar}/>

        <View className='bg-white dark:bg-[#1B1C1B]  rounded-2xl px-4 w-full py-[18px] gap-y-3 '>
          <Text className='text-lg px-1 dark:text-[#E7E7E7]'>Name</Text>
          <TextInput
          keyboardType='default'
          className='text-md dark:text-[#E7E7E7] bg-neutral-800 px-4 rounded-md'
          autoCapitalize='none'
          value={userName}
          onChangeText={setUserName}
          />
        </View>

      </View>
     </ProfileWrap>
  )
}

export default UserProfile