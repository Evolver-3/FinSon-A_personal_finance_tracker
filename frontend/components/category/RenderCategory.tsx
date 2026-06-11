import { View, Text, FlatList,Pressable} from 'react-native'
import { Pencil } from 'lucide-react-native'
import React from 'react'

type RenderCategoryProps={
  categories:Category[]
}

const RenderCategory = ({categories}:RenderCategoryProps) => {
  return (
    <View>
      {categories?.length===0? (
        <View>
        <Text className='text-white'>Add Categories</Text>
                </View>
    
              ):(
              <View className="">
                <FlatList
              ItemSeparatorComponent={()=><View style={{height:10}}/>}
              ListHeaderComponentStyle={{
                marginTop:100
              }}
              data={categories}
              keyExtractor={(data)=>data.id}
              renderItem={({item})=>(
                <View
                className='flex-row items-center bg-neutral-700 rounded-xl p-4 '>
                  <View className='flex-grow flex-row gap-x-4'>
                    <View
                    className='p-2 rounded-full shadow-sm'>
                      {item.icon}
                    </View>
    
                    <View>
                      <Text className='text-sm text-white'>{item.name}</Text>
                      <Text className={`text-xs text-white font-extralight `}
                      style={{
                        color:`${item.color}`
                        }}>{item.type}</Text>
                    </View>
                  </View>
    
                  <Pressable>
                    <Pencil
                    color={'#ffffff'}
                    size={18}/>
                  </Pressable>
                </View>
              )}/>
              </View>
              )}
              
            </View>
  )
}

export default RenderCategory