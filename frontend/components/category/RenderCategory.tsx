import { View, Text, FlatList,Pressable, ActivityIndicator, Modal} from 'react-native'
import { Pencil } from 'lucide-react-native'
import React,{useState} from 'react'
import UpdateCategory from './UpdateCategory'

type RenderCategoryProps={
  categories:Category[]
  loading:boolean
  selectedCategory:Category |null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>
  fetchCategory:(id:string)=>Promise<Category>
}

const RenderCategory = ({categories,loading,editCategory,fetchCategory}:RenderCategoryProps) => {

  const [openEdit,setOpenEdit]=useState(false)
  const [selectedCategory,setSelectedCategory]=useState<Category|null>(null)

  return (
    <View>
      {categories?.length===0? (
        <View>
        <Text className='text-white'>Add Categories</Text>
                </View>
                ):(
              <View className="">
                {loading?<ActivityIndicator/>:(
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
    
                  <Pressable
                  onPress={()=>{
                    setOpenEdit(true)
                    setSelectedCategory(item)}}>
                    <Pencil
                    color={'#ffffff'}
                    size={18}/>
                  </Pressable>
 
                </View>
                )}/>
                )}
              </View>
              )}

                <UpdateCategory
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                  selectedCategory={selectedCategory}
                  editCategory={editCategory}/>
              
            </View>
  )
}

export default RenderCategory