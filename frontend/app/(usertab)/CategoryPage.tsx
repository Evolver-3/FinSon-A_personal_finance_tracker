import { View, Text ,Pressable, Modal, FlatList, ViewStyle} from 'react-native'
import React,{useState} from 'react'
import Wrapper from '@/components/WrapperPage'
import TopUserComp from '@/components/comps/TopUserComp'
import { Cross, Pencil, Plus, Search } from 'lucide-react-native'
import { useCategory } from '@/hooks/useCategory'
import { ButtonNeed } from '@/components/comps/ButtonNeed'
import { TextData } from '@/components/comps/TextData'
import RenderCategory from '@/components/category/RenderCategory'
import { categoryColors, categorydynamicColors } from '@/data'

const CategoryPage = () => {
  const { selectedCategory,editCategory,fetchCategory,categories,loading,creatingCategory}=useCategory()
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
          
         
        </View>

         <Modal
          visible={visible}
          transparent={true}
          animationType='slide'
          onRequestClose={() => setVisible(false)}>

           <View className=" flex-1">

             <Pressable className='  bg-black/50 '
             style={{
              flex:1
             }}
              onPress={()=>setVisible(false)}/>

              <View className='bg-neutral-900 rounded-t-3xl pt-10 px-7 flex-col gap-y-3'
              style={{flex:3}}
              onStartShouldSetResponder={() => true}
              >

              <Text className='text-white text-lg font-semibold '>
                Add Category
              </Text>

              
                 <TextData
                  tagexist={false}
                  tag={'dd'}
                  value={name}
                  placeholder='e.g., Food'
                  onChangeText={setName}
                  secureTextEntry={false}/>

                  <View className='items-center justify-center mt-3'>
                   
                    <View className="flex-row gap-x-3 p-1 bg-neutral-500 rounded-xl w-1/2">
                    <SelectType
                    focused={type==="INCOME"}
                    onPress={()=>{
                      console.log("Income chosen")
                      setType("INCOME")}}
                    text='Income'/>

                    <SelectType
                    focused={type==="EXPENSE"}
                    onPress={()=>{
                      console.log("Expense chosen")
                      setType("EXPENSE")}}
                    text='Expense'/>
                  </View>
                  </View>

                  <View className=' flex-row gap-x-3'>
                    {categorydynamicColors.map((col,id)=>(
                    <View key={id}
                    className=''>
                      <SelectColors
                      style={{
                        backgroundColor:col.btncolor
                      }}
                      focused={color===col.btncolor}
                      onPress={()=>setColor(col.btncolor)}
                    />
                    </View>

                    ))}
                  </View>

                 
                  <ButtonNeed
                  onPress={handleSubmit}
                  text={'Create new'}
                  loading={loading}
                  disabled={loading}
                  />

              </View>
            
           </View>
          </Modal>

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

type SelectTypeProps={
  text:string 
  onPress:()=>void
  focused:boolean

}
export const SelectType=({text,onPress,focused}:SelectTypeProps)=>{
  return (
    <Pressable
    style={{
      flex:1,
      paddingHorizontal:8,
      paddingVertical:4,
      borderRadius:8,
      alignItems:'center',
      backgroundColor:focused?"#262626":"transparent"
    }}
    onPress={onPress}>
      <Text 
      style={{
        fontSize:14,
        fontWeight:"200",
        textAlign:"center",
        color:focused?"#60a5fa":"#000000"
      }}>{text}</Text>
    </Pressable>
  )
}

type SelectColorProps={
  onPress:()=>void
  focused:boolean
  style:ViewStyle

}

export const SelectColors=({onPress,focused,style}:SelectColorProps)=>{
  return (
    <Pressable
    className={` p-3 rounded-full items-center border ${focused?"border border-white":"border-0"}`}
    style={style}
    onPress={onPress}>
    </Pressable>
  )
}