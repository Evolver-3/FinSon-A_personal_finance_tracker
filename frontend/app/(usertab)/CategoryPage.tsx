import { View, Text ,Pressable, Modal, FlatList} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { Cross, Pencil, Plus, Search } from 'lucide-react-native'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed, TextData } from '../(auth)/sign-in'
import RenderCategory from '@/components/category/RenderCategory'

const CategoryPage = () => {
  const {fetchAllCategory,fetchCategory,categories,loading,creatingCategory}=useCategory()
  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState("#6366f1")
  const [icon,setIcon]=useState("")
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
          
          <Modal
          visible={visible}
          transparent={true}
          animationType='slide'
          onRequestClose={()=>setVisible(false)}>

            <Pressable className='flex-1 bg-black/50 justify-center items-center'
            onPress={()=>setVisible(false)}>

              <Pressable
              onPress={(e)=>e.stopPropagation()}>
              <View className='bg-neutral-900 rounded-xl p-6 w-4/5 shadow-md flex-col gap-y-4'>

              <Text className='text-white text-md font-extralight'>
                Create New Category
              </Text>

              <View>
                 <TextData
                  tagexist={false}
                  tag={''}
                  value={name}
                  placeholder='Category name'
                  onChangeText={setName}
                  secureTextEntry={false}/>

                  <View className="flex-row gap-x-3">
                    <SelectType
                    focused={type==="INCOME"}
                    onPress={()=>setType("INCOME")}
                    text='Income'/>

                    <SelectType
                    focused={type==="EXPENSE"}
                    onPress={()=>setType("EXPENSE")}
                    text='Expense'/>
                  </View>

                 
                  <ButtonNeed
                  onPress={handleSubmit}
                  text={'Create new'}
                  loading={loading}
                  disabled={loading}
                  />

              </View>
              </View>
              </Pressable>

            </Pressable>

          </Modal>
        </View>

        <RenderCategory
        categories={categories}/>
        

      </View>
    </Wrapper>
  )
}

export default CategoryPage

type SelectTypeProps={
  text:string 
  onPress:()=>void
  focused:boolean

}
export const SelectType=({text,onPress,focused}:SelectTypeProps)=>{
  return (
    <Pressable
    className={`flex-1 px-2 py-1 rounded-lg items-center ${focused ? "bg-green-500":"bg-neutral-500"}`}
    onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  )
}