import { View, Text ,Image} from 'react-native'
import React,{useEffect} from 'react'
import { useUser } from '@/hooks/useUser'
import { UserRound } from 'lucide-react-native'

type headingTextProps={
  headingText:string 
}
const TopUserComp = ({headingText}:headingTextProps) => {
   const {fetchUserProfile,user,loading}=useUser()

   useEffect(()=>{
      
    fetchUserProfile()
   },[])
  return (
    <View className="flex-row items-center gap-x-6 ">

      {user?.avatar ? (
        <Image 
        source={{uri:user?.avatar as any}}
        style={{width:30,height:30, borderRadius:40}}/>):(
          <UserRound
          size={30}
          color={"#ffffff"}/>
        )}  
           
      <Text className='text-neutral-700 dark:text-white text-lg '>{user?.name ?? headingText}</Text>  
              
    </View>
  )
}

export default TopUserComp