import { View, Text ,Pressable, Modal, FlatList} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import { useCategory } from '@/hooks/useCategory'
import CreateCategory from '@/components/category/CreateCategory'
import RenderCategory from '@/components/category/RenderCategory'
import { categorydynamicColors } from '@/data'
import HeaderList from '@/components/comps/Flat/HeaderList'

const CategoryPage = () => {

  const { selectedCategory,editCategory,fetchCategory,categories,loading,creatingCategory,removeCategory}=useCategory()

  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
  const [icon,setIcon]=useState<string | null>(null)
  const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")

  const [renderPageLoading,setRenderPageLoading]=useState(false)

  const [query,setQuery]=useState("")

  const filteredData=categories.filter(item=>{
    const searchable=item.name?? ""
    return searchable.toLowerCase().includes(query.toLowerCase())
  })
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
    <Wrapper
    loading={false}>

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
        loading={renderPageLoading}/>
        
        <FlatList
        data={filteredData}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={{paddingHorizontal:4,paddingTop:6, gap:10}}

        ListHeaderComponent={
        <HeaderList
        setQuery={setQuery}
        headingText={"Add New Categories"}
        onPress={()=>setVisible(true)}
        inlineText={"Search categories..."}/>
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

