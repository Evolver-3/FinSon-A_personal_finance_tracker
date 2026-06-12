import { View, Text,Modal,Pressable } from 'react-native'
import React from 'react'

type updateProps={
  openEdit:boolean
  setOpenEdit:React.Dispatch<React.SetStateAction<boolean>>
  selectedCategory:Category |null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>

}
const UpdateCategory = ({openEdit,setOpenEdit,selectedCategory,editCategory}:updateProps) => {

  console.log(selectedCategory)
  return (
    <View>
       <Modal
        visible={openEdit}
        transparent={true}
        animationType='slide'
        onRequestClose={()=>setOpenEdit(false)}>
          <Pressable
          className='flex-1 bg-black/50 justify-center items-center'
          onPress={()=>setOpenEdit(false)}>
            <Pressable
            onPress={(e)=>e.stopPropagation()}>
              <View>

              </View>
            </Pressable>
          </Pressable>
        </Modal>
    </View>
  )
}

export default UpdateCategory