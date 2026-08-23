import { View, Text,ScrollView} from 'react-native'
import { TextData } from '../comps/TextData'
import { ButtonNeed } from '../comps/ButtonNeed'
import React ,{ useState ,useEffect} from 'react'
import { categorydynamicColors,CategoryIcons } from '@/data'
import ModalComp, { SelectColors, SelectIcon, SelectType } from '../comps/Mode/ModalComp'
import ErrorPopUp from '../comps/ErrorPopUp'


const UpdateCategory = ({initialValues,
      submitText,
      openModal,
      setOpenModal,
      loading,
      error,
      setError,
      onSubmit}:updateProps) => {

    const [name,setName]=useState(initialValues?.amount?.toString()?? "")
    const [color,setColor]=useState<CategoryColor>(initialValues?.color ??categorydynamicColors[0])
    const [icon,setIcon]=useState<string | null>(initialValues?.icon ??null)
    const [type,setType]=useState<"INCOME" | "EXPENSE">(initialValues?.type??"EXPENSE")


    useEffect(()=>{
      if(initialValues){
        setName(initialValues.name ?? "")
        setColor(initialValues.color ?? categorydynamicColors[0])
        setIcon(initialValues.icon?? null)
        setType(initialValues.type ?? "EXPENSE")
      }
    },[initialValues]) 

    const handleSubmit=async()=>{
      if(!name||!color||!icon||!type){
        setError("All entries are not filled")
        return   
      }
      await onSubmit({
        name,icon,color,type
      })

      setName("")
      setType("EXPENSE")
      setIcon(null)
      setColor(categorydynamicColors[0])

      setOpenModal(false)
    }

    useEffect(()=>{
        const timer=setTimeout(()=>{
        setError(null)
      },3000)
          return()=>clearTimeout(timer)
    },[error])
   

  return (
    <ModalComp
    visible={openModal}
    onRequestClose={()=>setOpenModal(false)}
    textblock={"Update Category"}
    pressableFlex={3}
    viewFlex={3}
    >
      <View className="flex-col gap-y-5 mt-5 relative">
        <ErrorPopUp
        errorMessage={error}/>

        <TextData
      keyboardType="default"
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
         
      <View className=' flex-row gap-x-3 mt-2 items-center'>
        <Text className='text-md font-semibold text-white'>Choose Color</Text>

        <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal
            contentContainerClassName='items-center'
            className='flex-row'
            contentContainerStyle={{
              alignItems:"center",
              gap:10}}>
                
                {categorydynamicColors.map((col,id)=>(
                
                <View 
                  key={id}>
                  
                  <SelectColors
                    style={{
                          backgroundColor:col.btncolor
                      }}
                    focused={color.btncolor===col.btncolor}
                    onPress={()=>setColor(col)}/>
                </View>

                ))}
        </ScrollView>
                      
      </View>
                    
      <View className='flex-row items-center justify-between '>
          {CategoryIcons.map((tag)=>(
          <SelectIcon
            style={{}}
            key={tag.id}
            name={tag.name}
            icon={tag?.name}
            focused={icon===tag.name}
            onPress={()=>
            setIcon(tag.name)}
          />
          ))}
      </View>
                    
      <View className='flex-col gap-y-4 mt-3 flex-1'>
        <ButtonNeed
        style={{}}
        onPress={handleSubmit}
        text={'Edit'}
        loading={loading}
        disabled={loading}
        />
      </View>
      </View>
    </ModalComp>
  )
}

export default UpdateCategory