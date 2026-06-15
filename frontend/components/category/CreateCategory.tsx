import { View, Text ,Modal, Pressable,ScrollView, ViewStyle} from 'react-native'
import { TextData } from '../comps/TextData'
import { ButtonNeed } from '../comps/ButtonNeed'
import React from 'react'
import { categorydynamicColors, CategoryIcons } from '@/data'

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

    <Modal
    visible={visible}
    transparent={true}
    animationType='slide'
    onRequestClose={() => setVisible(false)}>
   
      <View className=" flex-1">
   
        <Pressable
        style={{
          flex:2,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        onPress={()=>setVisible(false)}/>
   
          <View className='bg-neutral-900 rounded-t-3xl pt-10 px-7 flex-col gap-y-8 '
          style={{flex:2}}
          onStartShouldSetResponder={() => true}>
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
              <View className='items-center justify-center '>
                <View className="flex-row gap-x-3 p-1 py-1 bg-neutral-500 rounded-xl">
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
   
              <View className=' flex-row gap-x-3'>
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

               <ButtonNeed
               style={{}}
              onPress={handleSubmit}
              text={'Create new'}
              loading={loading}
              disabled={loading}
              />
          </View>

         
               
        </View>
    </Modal>
  )
}

export default CreateCategory


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
      paddingVertical:8,
      borderRadius:8,
      alignItems:'center',
      backgroundColor:focused?"#262626":"transparent"
    }}
    onPress={onPress}>
      <Text 
      style={{
        fontSize:14,
        fontWeight:"400",
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

type TabIconProps={
  icon: string | null
  onPress:()=>void
  focused:boolean
  name:string
}


export const SelectIcon=({icon,onPress,focused,name}:TabIconProps)=>{
  return (
    <Pressable 
    style={{
      alignItems:'center',
      justifyContent:"center",
      padding:7,
      borderRadius:8,
      borderWidth:focused?1:0,
      borderColor:focused?"#60a5fa":"transparent",
      backgroundColor:focused?"#1e293b":'transparent'
    }}
    onPress={onPress}
    >
    {getIconByName(name,focused)}
    </Pressable>
  )
}

export const getIconByName=(name:string | null, focused:boolean)=>{
  if(!name) return null 

  const found=CategoryIcons.find(c=>c.name===name)

  return found?found.symbol(focused):null
}