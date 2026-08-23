import { View, FlatList} from 'react-native'
import {useState} from 'react'
import Wrapper from '@/components/mainUi/WrapperPage'
import { useCategory } from '@/hooks/useCategory'
import CreateCategory from '@/components/category/CreateCategory'
import RenderCategory from '@/components/category/RenderCategory'
import HeaderList from '@/components/comps/Flat/HeaderList'
import { FakeLoad } from '@/components/comps/Animate/FakeLoad'
import { useTheme } from '@/hooks/useTheme'

const CategoryPage = () => {

  const { selectedCategory,editCategory,categories,loading,creatingCategory,removeCategory}=useCategory()

  const [visible,setVisible]=useState(false)
  const [renderPageLoading,setRenderPageLoading]=useState(false)

  const [pageError,setPageError]=useState<string | null>("")

  const [query,setQuery]=useState("")
  const {isDark}=useTheme()

  const filteredData=categories.filter(item=>{
    const searchable=item.name?? ""
    return searchable.toLowerCase().includes(query.toLowerCase())
  })

  const isInitiallyLoading=loading && categories.length===0
  return (
    <Wrapper
    loading={false}>

       <CreateCategory
        visible={visible}
        setVisible={setVisible}
        loading={renderPageLoading}
        setloading={setRenderPageLoading}
        pageError={pageError}
        setPageError={setPageError}
        creatingCategory={creatingCategory}

        />
        
        <FlatList
        data={isInitiallyLoading?[]:filteredData}
        keyExtractor={(item)=>item.id}
        contentContainerStyle={{paddingHorizontal:4,paddingTop:6, gap:10}}

        ListHeaderComponent={
        <HeaderList
        pressableNeeded
        setQuery={setQuery}
        headingText={"Add New Categories"}
        onPress={()=>setVisible(true)}
        inlineText={"Search categories..."}/>
        }
        
        ListEmptyComponent={
        <FakeLoad 
          loading={isInitiallyLoading}
          hasData={categories.length>0}
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
          selectedCategory={selectedCategory}
          editCategory={editCategory}
          removeCategory={removeCategory}
          />
        )}
        />

    </Wrapper>
  )
}

export default CategoryPage

