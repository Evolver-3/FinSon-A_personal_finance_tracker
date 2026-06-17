import { View, Text ,Modal, Pressable,ScrollView, ViewStyle, ActivityIndicator} from 'react-native'
import { TextData } from '../comps/TextData'
import { ButtonNeed } from '../comps/ButtonNeed'
import React ,{ useState ,useEffect} from 'react'
import { categorydynamicColors,CategoryIcons } from '@/data'
import ModalComp, { SelectColors, SelectIcon, SelectType } from '../comps/Mode/ModalComp'

type updateProps={
  openEdit:boolean
  setOpenEdit:React.Dispatch<React.SetStateAction<boolean>>
  selectedCategory:Category  | null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>
  removeCategory:(id:string)=>Promise<void>
  loading:boolean

}
const UpdateCategory = ({openEdit,setOpenEdit,selectedCategory,editCategory,removeCategory,loading}:updateProps) => {

    const [name,setName]=useState("")
    const [color,setColor]=useState<CategoryColor>(categorydynamicColors[0])
    const [icon,setIcon]=useState<string | null>(null)
    const [type,setType]=useState<"INCOME" | "EXPENSE">("EXPENSE")
    const [editPageLoading,setEditPageLoading]=useState(false)
    const [removePageLoading,setRemovePageLoading]=useState(false)

    const handleEditCategory=async()=>{
      try{
  
        setEditPageLoading(true)
        if(!selectedCategory?.id)return

        console.log("Category clicked:",selectedCategory)
        await editCategory(selectedCategory?.id,{name,color,type,icon})

        setOpenEdit(false)
      }catch(error){
        console.log(error)
      }finally{
        setEditPageLoading(false)

      }
    }

    useEffect(()=>{
      if(selectedCategory){
        setName(selectedCategory.name ?? "")
        setColor(selectedCategory.color ?? categorydynamicColors[0])
        setIcon(selectedCategory.icon?? null)
        setType(selectedCategory.type ?? "EXPENSE")
      
      }
    },[selectedCategory]) 

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
    <ModalComp
    visible={openEdit}
    onRequestClose={()=>setOpenEdit(false)}
    textblock={"Update Category"}
    >
      <TextData
        tagexist={false}
        tag={'dd'}
        value={name}
        placeholder='e.g., Food'
        onChangeText={setName}
        secureTextEntry={false}/>

      <View className='items-center justify-center mt-3 '>
        <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">
          <SelectType
            focused={type==="INCOME"}
            onPress={()=>setType("INCOME")}
            text='Income'/>
         
          <SelectType
            focused={type==="EXPENSE"}
            onPress={()=>setType("EXPENSE")}
            text='Expense'/>
        </View>
      </View>
         
      <View className=' flex-row gap-x-3 mt-1'>
          <Text className='text-md font-semibold text-white'>Choose Color</Text>
                      <ScrollView
                      showsVerticalScrollIndicator={false}
                      horizontal
                      contentContainerClassName='items-center'
                      className='flex-row'
                      contentContainerStyle={{alignItems:"center",
                        gap:10}}>
                        {categorydynamicColors.map((col,id)=>(
                        <View key={id}
                        className=''>
                          <SelectColors
                          style={{
                          backgroundColor:col.btncolor
                          }}
                          focused={color.btncolor===col.btncolor}
                          onPress={()=>setColor(col)}
                          />
                        </View>
                      ))}
                      </ScrollView>
                    </View>
      
                    <View className='flex-row items-center justify-between '>
                      {CategoryIcons.map((tag)=>(
                        <SelectIcon
                        key={tag.id}
                        name={tag.name}
                        icon={tag?.name}
                        focused={icon===tag.name}
                        onPress={()=>
                          setIcon(tag.name)}
                      />
                      ))}
                    </View>
                    
                   <View className='flex-col gap-y-4 mt-3 '>
                       <ButtonNeed
                    style={{}}
                    onPress={handleEditCategory}
                    text={'Edit'}
                    loading={editPageLoading}
                    disabled={editPageLoading}
                    />
                    
                    <ButtonNeed
                    style={{
                    }}
                    onPress={handleDeleteCategory}
                    text={'Remove'}
                    loading={removePageLoading}
                    disabled={removePageLoading}
                    />
                   </View>
    </ModalComp>
  )
}

export default UpdateCategory