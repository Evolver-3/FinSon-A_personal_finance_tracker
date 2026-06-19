import { View, Text, Pressable, Modal, FlatList} from 'react-native'
import React,{useState} from 'react'
import { ChevronDown } from 'lucide-react-native'

type DropdownOptions={
  id:string 
  name:string
  color:CategoryColor
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
    style={{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderWidth:1,
      borderColor:`${selected?.color.darkColor}`,
      borderRadius:4,
      padding:10
    }}
    onPress={()=>setOpen(true)}>
      <Text style={{
        color:selected? selected.color.colors:"#fff"
      }}>
        {selected?selected.name:placeholder}
      </Text>
      <ChevronDown color={"#fff"} size={16}/> 

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
        paddingHorizontal:24
      }}
      onPress={()=>setOpen(false)}
      >

        <View
        style={{
          backgroundColor:'#171717',
          borderRadius:12,
          maxHeight:300
        }}
        onStartShouldSetResponder={()=>true}>
          <FlatList
          data={options}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>(

          <Pressable
          style={{
            padding:14,
            backgroundColor:item.id===selectedId?selected?.color.btncolor:"transparent"
          }}
            onPress={()=>{
            onSelect(item.id)
            setOpen(false)
          }}>
            <Text
            style={{
              color:`${selected?.color.darkColor}`
            }}>{item.name}</Text>
            </Pressable>
        )}/>
        </View>
      </Pressable>

    </Modal>
    </>
  )
}

export default SelectDropdown