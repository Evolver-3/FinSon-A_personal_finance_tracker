import { View, Text, FlatList,Pressable, ActivityIndicator, Modal} from 'react-native'
import { Pencil } from 'lucide-react-native'
import React,{useState} from 'react'
import UpdateCategory from './UpdateCategory'
import { getIconByName } from '../comps/Mode/ModalComp'

type RenderCategoryProps={
  item:Category
  loading:boolean
  selectedCategory:Category |null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>
  fetchCategory:(id:string)=>Promise<Category>
  removeCategory:(id:string)=>Promise<void>
}

const RenderCategory = ({loading,editCategory,removeCategory,item}:RenderCategoryProps) => {

  const [openEdit,setOpenEdit]=useState(false)
  const [selectedCategory,setSelectedCategory]=useState<Category|null>(null)

  return (
    <View className='px-4'>
      <View
            className='flex-row items-center rounded-xl p-4 '
            style={{
              backgroundColor:item.color.darkColor,
              borderColor:item.color.colors,
              borderWidth:1
              }}>
              <View className='flex-grow flex-row gap-x-4 items-center'>
                <View
                className='pr-2'>
                  {getIconByName(item.icon,false)}
                </View>
             
                <View className=''>
                  <View className='flex-row items-center gap-x-4'>
                    <Text className='text-lg text-neutral-500'>
                      {item.name}
                    </Text>
                    <View className='p-[2px] rounded-xl'
                    style={{
                      backgroundColor:`${item.color.colors}`
                    }}>
                      <Text
                      style={{
                      color:`${item.color.btncolor}`,
                      fontSize:8
                      }}>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                
                </View>
      
              </View>
             
              <Pressable
                onPress={()=>{
                setOpenEdit(true)
                setSelectedCategory(item)}}>
                  <Pencil
                    color={'#000000'}
                    size={18}/>
              </Pressable>
          
            </View>

      <UpdateCategory
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      selectedCategory={selectedCategory}
      editCategory={editCategory}
      removeCategory={removeCategory}
      loading={loading}/>
              
    </View>
  )
}

export default RenderCategory