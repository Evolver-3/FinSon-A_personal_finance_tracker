import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useUser } from '@/hooks/useUser'
import { ChevronRight, ImageUp, LayoutPanelTop, User, UserRound } from 'lucide-react-native'
import * as ImagePicker from 'expo-image-picker'
import { Link ,Href} from 'expo-router'

const AvatarUpload = () => {

  const {addingAvatar,user,fetchUserProfile,loading}=useUser()

  const [errorMessage,setErrorMessage]=useState<string>("")
  const [errorLoading,setErrorLoading]=useState(false)

  useEffect(()=>{
    fetchUserProfile()
  },[])

 const pickAvatar = async () => {
  try {
    setErrorLoading(true)
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
    setErrorLoading(false)
  }
}

  return (

    <View className='flex-col gap-y-5'>
      <View 
        className='bg-neutral-700 rounded-full relative'
        style={{width:100,height:100}}>

        {user?.avatar ? (
        loading?<ActivityIndicator/>:(
          <Image source={{uri:user?.avatar as any}}
        style={{
          width:100,
          height:100,
          borderRadius:50
        }}/>
        )
        ):(
        <UserRound size={100}/>
        )}


        <Pressable className='absolute top-0 right-0 bg-neutral-500 p-1 rounded-xl'
        onPress={pickAvatar}
        disabled={loading}>
       <ImageUp
        size={15} color={"#ffffff"}/>
      </Pressable>
      </View>

      <View className=''>
        <Tabs texthead={"PREFERENCES"}/>
      </View>
    </View>
  )
}

export default AvatarUpload

type textheadProps={
  texthead:string 

}


export const Tabs=({texthead}:textheadProps)=>{
  return(
    <View className='flex-col gap-y-4'>
      <Text className='text-neutral-200 text-xs font-extralight'>{texthead}</Text>
      <View className='box-block gap-y-5'>
        <Tabrow
        href={"/(usertab)/AccountPage"}
        icon={<User size={20} color={'#ffffff'}/>}
        tabName={'Account Settings'}/>

        <Tabrow
        href={"/(usertab)/CategoryPage"}
        icon={<LayoutPanelTop size={20} color={'#ffffff'}/>}
        tabName={'Categories'}/>
      </View>
    </View>
  )
}

type tabRowType={
  icon:React.ReactNode 
  tabName:string
  href:Href
}
export const Tabrow=({icon,tabName,href}:tabRowType)=>{
  return(
    <View className='flex-row justify-between '>
      <Link href={href}
      className='w-full'>
     <View className=' flex-row gap-x-3 items-center justify-center'>
       {icon}
      <Text className='text-white '>{tabName}</Text>
     </View>
     
     <Pressable
     className="flex-grow">
      <ChevronRight
      size={20}
      color={'#ffffff'}/>
     </Pressable>
    </Link>

    </View>
  )
}