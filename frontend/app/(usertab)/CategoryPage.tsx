import { View, Text ,Pressable, Modal, FlatList, ViewStyle, ScrollView} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { Plus, Search } from 'lucide-react-native'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import { TextData } from '@/components/comps/TextData'
import RenderCategory from '@/components/category/RenderCategory'
import { categorydynamicColors } from '@/data'
import CreateCategory from '@/components/category/CreateCategory'

const Size=28
const GAP=10
const CLOSED_WIDTH=Size 

const OPEN_WIDTH=250
const CategoryPage = () => {
  const { selectedCategory,editCategory,fetchCategory,categories,loading,creatingCategory}=useCategory()
  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState("#6366f1")
  const [icon,setIcon]=useState<IconFn | null>(null)
  const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")

  const handleSubmit=async()=>{
    await creatingCategory({name,type,color})

    setName("")
    setColor("#6366f1")
    setVisible(false)

  }
  console.log(categories)
  return (
    <Wrapper>
      <View className='flex-1 px-4 gap-y-4 pt-4'>
        <TopUserComp
        headingText={"Category"}/>
 
        <View className='flex-row items-center gap-x-2'>

          <View className='flex-row border border-neutral-500 rounded-lg w-8/10 p-2 gap-x-4 flex-grow'>
          <Search size={20} color={"#ffffff"}/>
          <Text className='text-sm text-white font-extralight'>Search Categories...</Text>

          </View>

          <View className='rounded-lg p-2 bg-neutral-600 border border-neutral-600'>
            <Pressable
            onPress={()=>setVisible(true)}>
              <Plus
              color={"#ffffff"}
              size={20}/>
            </Pressable>
          </View>
          
         
        </View>

        <CreateCategory
        visible={visible}
        setVisible={setVisible}
        name={name}
        setName={setName}
        type={type} 
        setType={setType} 
        color={color}
        setColor={setColor}
        icon={icon}
        setIcon={setIcon}
        handleSubmit={handleSubmit}
        loading={loading}/>

        <RenderCategory
        categories={categories}
        loading={loading}
        selectedCategory={selectedCategory}
        editCategory={editCategory}
        fetchCategory={fetchCategory}/>
        

      </View>
    </Wrapper>
  )
}

export default CategoryPage

