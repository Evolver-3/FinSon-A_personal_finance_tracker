import { View, Text, Pressable, Modal, FlatList} from 'react-native'
import React,{useState} from 'react'
import { ChevronDown } from 'lucide-react-native'
import ThemeIcon from '@/components/Theme/ThemeIcon'

type DropdownOptions={
  id:string 
  name:string
  color?:CategoryColor
}

type DropdownProps={
  options:DropdownOptions[]
  selectedId:string 
  onSelect:(id:string)=>void
  placeholder?:string
}
const SelectDropdown = ({options,selectedId,onSelect,placeholder}:DropdownProps) => {

  const [open,setOpen]=useState(false)

  const selected=options.find(opt=>opt.id===selectedId)
  return (<>
    <Pressable
    className='mainbg'
    style={{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderRadius:10,
      padding:10,
      flexGrow:1,
      elevation:2,
      borderWidth:0
    }}
    onPress={()=>setOpen(true)}>
      <Text className={`${selected?selected.color?.darkColor:"#00000" }`}>
        {selected?selected.name:placeholder}
      </Text>

      <ThemeIcon
      icon={ChevronDown}
      size={16}/>

    </Pressable>

    <Modal
    visible={open}
    transparent
    animationType="slide"
    onRequestClose={()=>setOpen(false)}>
      <Pressable
      style={{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        paddingHorizontal:120,
        borderRadius:20
      }}
      onPress={()=>setOpen(false)}
      >

        <View
        style={{
          backgroundColor:'#171717',
          maxHeight:200,
        }}
        onStartShouldSetResponder={()=>true}>
          <FlatList
          data={options}
          keyExtractor={(item)=>item.id}
          style={{
            borderRadius:2
          }}
          renderItem={({item})=>(

          <Pressable
          style={{
            padding:14,
            backgroundColor:item.id===selectedId?"#4EB6DF":"#EBE9F0"
          }}
            onPress={()=>{
            onSelect(item.id)
            setOpen(false)
          }}>
            <Text
            style={{
              color:item.id===selectedId?"#ffffff":"#525154"
            }}
            className='text-sm font-semibold'>{item.name}</Text> 
            </Pressable>
        )}/>
        </View>
      </Pressable>

    </Modal>
    </>
  )
}

export default SelectDropdown