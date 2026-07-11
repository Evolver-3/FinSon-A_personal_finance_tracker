import { View, Text, FlatList,Pressable, ActivityIndicator, Modal} from 'react-native'
import { Pencil } from 'lucide-react-native'
import React,{useState} from 'react'
import UpdateCategory from './UpdateCategory'
import { getIconByName } from '../comps/Mode/ModalComp'
import { useTheme } from '@/hooks/useTheme'
import PressedAnimate from '../comps/Animate/PressedAnimate'

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
  const [removePageLoading,setRemovePageLoading]=useState(false)
  
  const {isDark}=useTheme()

   const handleDeleteCategory=async()=>{
    try{
      setRemovePageLoading(true)

      if(!selectedCategory?.id)return 

      await removeCategory(selectedCategory?.id)
      setOpenEdit(false)
    }catch(error){
      console.log(error)
    }finally{
      setRemovePageLoading(false)

    }
    }

  return (
    <View 
      className='px-4'>
      <View
        className='rounded-xl py-6 px-4 mainbg mainborder flex-col gap-y-4'
        style={{
          backgroundColor:isDark?"#212121":item.color.colors,
          elevation:2
        }}>
          <View
            className=' flex-row gap-x-5 items-center'>
            <View
              className='p-2 items-center rounded-lg'
              style={{
                elevation:5,
                backgroundColor:item.color.darkColor
              }}>
              {getIconByName(item.icon,false,isDark?"#000000":"#ffffff",24)}
            </View>
             
            <View 
              className='flex-row items-center gap-x-4'>
                <Text 
                  className=' text-md biggerText uppercase'
                  style={{
                    fontFamily:"Sans-Bold"
                  }}>
                    {item.name}
                </Text>

                <View 
                  className='px-2 py-1 rounded-md'
                  style={{
                      backgroundColor:"#C4B6D2"
                    }}>
                      <Text
                        style={{
                          color:isDark?"#000000":"#ffffff",
                          fontSize:8,
                          fontFamily:"Sans-Semibold"
                        }}>
                          {item.type}
                      </Text>
                </View>
            </View>

            <View 
              className='flex-row gap-x-5 justify-end flex-grow'>
              
              <PressedAnimate
                onPress={()=>setOpenEdit(true)}
                originalColor={isDark?"#518151":"#ADF7B3"}
                pressedColor={isDark?"#49B649":"#CEE9D0"}
                style={{
                  width:40,
                  height:20,
                  borderRadius:5,
                  alignItems:"center",
                  justifyContent:"center",
                  elevation:6}}>
                              
                  <Text
                    className="smallText text-xs"
                    style={{
                          fontFamily:"Sans-Semibold"
                        }}>
                          Edit
                  </Text>
              </PressedAnimate>
                              
              <PressedAnimate
                onPress={handleDeleteCategory}
                originalColor={isDark?"#753B2F":"#D28E89"}
                pressedColor={"#EAA59E"}
                style={{
                  width:60,
                  height:20,
                  borderRadius:5,
                  alignItems:'center',
                  justifyContent:"center",
                  elevation:6}}>
                  
                    {removePageLoading ?
                    (<ActivityIndicator color={"#ffffff"} size={10}/>):
                    <Text 
                      className="smallText text-xs"
                      style={{
                          fontFamily:"Sans-Semibold"
                      }}>
                        Remove
                    </Text>}
              </PressedAnimate>
            </View>
          
          </View>
      </View>

      <UpdateCategory
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      selectedCategory={selectedCategory}
      editCategory={editCategory}
      loading={loading}/>
              
    </View>
  )
}

export default RenderCategory