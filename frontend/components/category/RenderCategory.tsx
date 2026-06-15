import { View, Text, FlatList,Pressable, ActivityIndicator, Modal} from 'react-native'
import { Pencil } from 'lucide-react-native'
import React,{useState} from 'react'
import UpdateCategory from './UpdateCategory'
import { getIconByName } from './CreateCategory'

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
          backgroundColor:item.color.darkColor
          }}>
          <View className='flex-grow flex-row gap-x-4'>
            <View
            className='p-2 rounded-full shadow-sm'>
              {getIconByName(item.icon,false)}
            </View>
    
            <View>
              <Text className='text-sm text-white'>{item.name}</Text>
              <Text className={`text-xs text-white font-extralight `}
                style={{
                  color:`${item.color.colors}`
                }}>{item.type}</Text>
            </View>
          </View>
    
          <Pressable
            onPress={()=>{
            console.log('pencil pressed', item.id)
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