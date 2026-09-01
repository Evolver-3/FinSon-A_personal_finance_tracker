import { View, Image, Pressable, ActivityIndicator } from 'react-native'
import { UserRound } from 'lucide-react-native'

const AvatarUpload = ({user,loading,pickAvatar}:{user: User | null,loading:boolean, pickAvatar:() => Promise<void>}) => {
  return (

    <View className='flex-col gap-y-5'>
      <View 
        className='bg-neutral-700 rounded-full relative items-center justify-center'
        style={{width:100,height:100}}>

        {user?.avatar ? (
        loading?(<ActivityIndicator />):(
          <Pressable
          onPress={pickAvatar}
          disabled={loading}>
          <Image source={{uri:user?.avatar as any}}
        style={{
          width:100,
          height:100,
          borderRadius:50
        }}/>
        </Pressable>
        )
        ):(
        <UserRound size={100}/>
        )}

      </View>
    </View>
  )
}

export default AvatarUpload
