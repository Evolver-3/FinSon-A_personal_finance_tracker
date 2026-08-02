import { View, Text ,Image} from 'react-native'
import React,{useEffect} from 'react'
import { useUser } from '@/hooks/useUser'
import { BellIcon, UserRound } from 'lucide-react-native'


const TopUserComp = ({headingText}:headingTextProps) => {
   const {fetchUserProfile,user,loading}=useUser()

   useEffect(()=>{
      
    fetchUserProfile()
   },[])

  return (
    <View className="topHead">

      <View className="imageText">
        {user?.avatar ? (
        <Image 
        source={{uri:user?.avatar as any}}
        className='mainImage borderOne'
        />):(
          <UserRound
          size={30}
          color={"#ffffff"}/>
        )}  
           
      <Text className='biggerText topHeadings'
      style={{
        fontFamily:"Sans-Extrabold"
      }}>{ headingText}</Text>  
      </View>

      <View className="bellIcon  hoverBorder">
        <BellIcon size={20} color={"#ffffff"}/>
      </View>

              
    </View>
  )
}

export default TopUserComp