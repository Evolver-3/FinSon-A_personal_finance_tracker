import {ActivityIndicator, Pressable,Text} from 'react-native'

type buttonNeedProps={
  onPress:()=>void
  text:string
  disabled:boolean
  loading:boolean
}

export const ButtonNeed=({onPress,text,disabled,loading}:buttonNeedProps)=>{
  return(
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className='items-center justify-center mt-10 cursor-pointer'>
        <Text className='text-center  py-3 rounded-xl w-4/5  bg-neutral-900  text-white text-md border border-neutral-600'>
          {loading?<ActivityIndicator/> :text}
        </Text>
    </Pressable>
  )
}