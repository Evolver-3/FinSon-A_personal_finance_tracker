import { View, Text ,Pressable, Modal, FlatList} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import { useCategory } from '@/hooks/useCategory'
import CreateCategory from '@/components/category/CreateCategory'
import RenderCategory from '@/components/category/RenderCategory'
import { categorydynamicColors } from '@/data'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { FakeLoad } from './AccountPage'
import { useTheme } from '@/hooks/useTheme'

const CategoryPage = () => {

  const { selectedCategory,editCategory,fetchCategory,categories,loading,creatingCategory,removeCategory,error}=useCategory()

  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
  const [icon,setIcon]=useState<string | null>(null)
  const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")

  const [renderPageLoading,setRenderPageLoading]=useState(false)

  const [createError,setCreateError]=useState<string | null>(null)

  const [query,setQuery]=useState("")
  const {isDark}=useTheme()

  const filteredData=categories.filter(item=>{
    const searchable=item.name?? ""
    return searchable.toLowerCase().includes(query.toLowerCase())
  })

  const isInitiallyLoading=loading && categories.length===0
  console.log(isInitiallyLoading)

  const handleSubmit=async()=>{
  
   try{
    setRenderPageLoading(true)
    setCreateError(null)

    await creatingCategory({name,type,color,icon})
    setName("")
    setColor(categorydynamicColors[0])
    setVisible(false)
   }catch(err:any){
    setCreateError(err?.response?.data?.message || err?.message || error || "Error occurred while creatin category")

   }finally{
    setRenderPageLoading(false)
   }

  }

  
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
        loading={renderPageLoading} 
        />
        
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
        <FakeLoad 
          loading={isInitiallyLoading}
          hasAccounts={categories.length>0}
          query={query}
          unmatchText='No matching category found'
          defaultText='Add an category'>

          {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
              <View key={item}
                className='w-full h-20 rounded-md'
                style={{
                    backgroundColor:isDark?"#857A83":"#E3C1DE"
                  }}>
              </View>
          ))}
        </FakeLoad>
          
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

