import { View, Text ,Image,Pressable} from 'react-native'
import React,{useEffect} from 'react'
import { useUser } from '@/hooks/useUser'
import { BellIcon, UserRound } from 'lucide-react-native'
import ThemeIcon from '../Theme/ThemeIcon'
import { useGuest } from '@/hooks/useGuest'
import { useAuth } from '@clerk/clerk-expo'

const TopUserComp = ({otherText,headingText,children}:headingTextProps) => {
   const {fetchUserProfile,backendUser}=useUser()
     const guest=useGuest()
     const {isSignedIn}=useAuth()
     const isGuest=!isSignedIn

    const userData=isGuest?guest.userInfo:backendUser

  return (
    <View className="topHead">

      <View className="imageText">
        {backendUser?.avatar ? (
        <Image 
        source={{uri:backendUser?.avatar as any}}
        className='mainImage borderOne'
        />):(
          <UserRound
          size={30}
          color={"#ffffff"}/>
        )}  

        {children}
           
      <Text className='biggerText topHeadings'
      style={{
        fontFamily:"Sans-bold"
      }}>{otherText?headingText:userData?.name}</Text>  
      </View>

      <Pressable className="bellIcon ">
        <ThemeIcon icon={BellIcon} size={20} lightColor={"#525252"} darkColor={"#ffffff"}/>
      </Pressable>

              
    </View>
  )
}

export default TopUserComp