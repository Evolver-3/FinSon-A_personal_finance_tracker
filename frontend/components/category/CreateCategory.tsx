import { View, Text ,Modal, Pressable,ScrollView, ViewStyle} from 'react-native'
import { TextData } from '../comps/TextData'
import { ButtonNeed } from '../comps/ButtonNeed'
import React from 'react'
import { categorydynamicColors, CategoryIcons } from '@/data'
import ModalComp, { SelectColors, SelectIcon, SelectType } from '../comps/Mode/ModalComp'

type createCateProps={
  visible:boolean 
  setVisible:React.Dispatch<React.SetStateAction<boolean>>
  name:string 
  setName:React.Dispatch<React.SetStateAction<string>>
  type:string
  setType:React.Dispatch<React.SetStateAction<"INCOME"|"EXPENSE">>
  color:CategoryColor
  setColor:React.Dispatch<React.SetStateAction<CategoryColor>>
  handleSubmit:()=>void
  loading:boolean
  icon:string|null
  setIcon:React.Dispatch<React.SetStateAction<string| null>>
}
const CreateCategory = ({visible,setVisible,name,setName,type,setType,color,setColor,handleSubmit,loading,icon,setIcon}:createCateProps) => {

  return (

    <ModalComp
    visible={visible}
    onRequestClose={()=>setVisible(false)}
    textblock={"Create Category"}
    pressableFlex={3}
    viewFlex={2}>
      
      <TextData
        keyboardType="default"
        tagexist={false}
        tag={''}
        value={name}
        placeholder='e.g., Food'
        onChangeText={setName}
        secureTextEntry={false}/>
        
        <View
          className='items-center justify-center '>
                
          <View 
            className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">
                
            <SelectType
              focused={type==="INCOME"}
              onPress={()=>setType("INCOME")}
              text='Income'/>
   
            <SelectType
              focused={type==="EXPENSE"}
              onPress={()=>
              setType("EXPENSE")}
              text='Expense'/>

          </View>

        </View>
   
        <View
          className=' flex-row gap-x-3'>
          
          <Text
            className='text-md font-semibold text-white'>
              Choose Color
          </Text>
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal
            contentContainerClassName='items-center'
            className='flex-row'
            contentContainerStyle={{
              alignItems:"center",
              gap:10
            }}>
              
              {categorydynamicColors.map((col,id)=>(
                <View
                  key={id}>
                  
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

        <View 
          className='flex-row items-center justify-between '>
                
          {CategoryIcons.map((tag)=>(
            <SelectIcon
              style={{}}
              key={tag.id}
              name={tag.name}
              icon={tag?.name}
              focused={icon===tag.name}
              onPress={()=>setIcon(tag.name)}/>))}
        </View>

        <ButtonNeed
          style={{}}
          onPress={handleSubmit}
          text={'Create new'}
          loading={loading}
          disabled={loading}
          />
          
    </ModalComp>
  )
}

export default CreateCategory

