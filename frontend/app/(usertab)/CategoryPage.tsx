import { View, Text ,Pressable, Modal} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { Cross, Plus, Search } from 'lucide-react-native'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed, TextData } from '../(auth)/sign-in'

const CategoryPage = () => {
  const {fetchAllCategory,fetchCategory,categories,loading}=useCategory()
  const [visible,setVisible]=useState(false)

  const [name,setName]=useState("")
  const [color,setColor]=useState("#6366f1")
  const [icon,setIcon]=useState("")
  const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")

  const handleSubmit=async()=>{

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

          <View className='rounded-lg  p-2 bg-neutral-600 border border-neutral-600'>
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

                  <ButtonNeed
                  onPress={handleSubmit}
                  text={'Create new'}
                  loading={loading}
                  disabled={loading}
                  />

              </View>
              </View>

            </Pressable>

          </Modal>
        </View>

        <View>
          {categories.length===0? (
            <View>
              <Text className='text-white'>Add Categories</Text>
            </View>

          ):(
            <View>
            </View>

          )}
          
        </View>
        

      </View>
    </Wrapper>
  )
}

export default CategoryPage