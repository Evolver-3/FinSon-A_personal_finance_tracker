import { View, Text ,Pressable, Modal, FlatList, ViewStyle, ScrollView} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { Plus, Search } from 'lucide-react-native'
import { useCategory } from '@/hooks/useCategory'
import CreateCategory from '@/components/category/CreateCategory'
import RenderCategory from '@/components/category/RenderCategory'
import { categorydynamicColors } from '@/data'

const Size=28
const GAP=10
const CLOSED_WIDTH=Size 

const OPEN_WIDTH=250
const CategoryPage = () => {
  const { selectedCategory,editCategory,fetchCategory,categories,loading,creatingCategory,removeCategory}=useCategory()
  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
  const [icon,setIcon]=useState<string | null>(null)
  const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")

  const [renderPageLoading,setRenderPageLoading]=useState(false)
  const handleSubmit=async()=>{
  
   try{
    setRenderPageLoading(true)

    await creatingCategory({name,type,color,icon})
    setName("")
    setColor(categorydynamicColors[0])
    setVisible(false)
   }catch(error){
    console.log(error)

   }finally{
    setRenderPageLoading(false)
   }

  }
  console.log(categories)
  return (
    <Wrapper>
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
        
        <FlatList
        data={categories}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={{paddingHorizontal:4,paddingTop:6, gap:10}}
        ListHeaderComponent={
        <View className='flex-1 px-4 gap-y-4 pt-4'>
        <TopUserComp
        headingText={"Category"}/>
 
        <View className='flex-row items-center gap-x-2'>

          <View className='flex-row border border-neutral-500 rounded-lg w-8/10 p-2 gap-x-4 flex-grow'>
          <Search size={20} color={"#ffffff"}/>
          <Text className='text-sm text-white font-extralight'>Search Categories...</Text>

          </View>
            <Pressable
            className='rounded-lg p-2 bg-neutral-600 border border-neutral-600'
            onPress={()=>setVisible(true)}>
              <Plus
              color={"#ffffff"}
              size={20}/>
            </Pressable>
          </View>
        </View>
        }
        ListEmptyComponent={
          <View className='px-4'>
            <Text style={{color:"#ffffff"}}>Add Category</Text>
          </View>
          
        }

        renderItem={({item})=>(
          <RenderCategory
          item={item}
        loading={renderPageLoading}
        selectedCategory={selectedCategory}
        editCategory={editCategory}
        fetchCategory={fetchCategory}
        removeCategory={removeCategory}
        />
        )}
        />

    </Wrapper>
  )
}

export default CategoryPage

