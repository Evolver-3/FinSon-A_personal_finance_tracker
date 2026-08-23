import { View, Text, Modal, Pressable,Dimensions,ScrollView} from 'react-native'
import { AccountIcons, CategoryIcons } from '@/data'
import { useTheme } from '@/hooks/useTheme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalComp = ({ visible, onRequestClose, textblock, children }: ModalCompProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Backdrop */}
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={onRequestClose}
        />

        {/* Content: grows with children, scrolls if too tall */}
        <View
          className="bg-neutral-300 dark:bg-neutral-800 rounded-t-3xl pt-4 px-7"
          style={{
            maxHeight: SCREEN_HEIGHT * 0.75, // cap at 75% of screen
          }}
        >
          {/* Handle bar */}
          <View className="w-12 h-1 bg-gray-400 rounded-full self-center mb-4" />

          <Text className="text-lg font-semibold text-black dark:text-white mb-4">
            {textblock}
          </Text>

          {/* ScrollView wraps children — handles both short and long content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComp


export const SelectType=({text,onPress,focused}:SelectTypeProps)=>{
  const {isDark}=useTheme()
  return (
    <Pressable
    style={{
      flex:1,
      paddingHorizontal:8,
      paddingVertical:8,
      borderRadius:8,
      alignItems:'center',
      backgroundColor:focused?"#2F2B2B":"transparent"
    }}
    onPress={onPress}>
      <Text 
      style={{
        fontSize:14,
        fontWeight:"400",
        textAlign:"center",
        color:focused?"#60a5fa":isDark?"#ffffff":"#000000"
      }}>{text}</Text>
    </Pressable>
  )
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

export const SelectIcon=({icon,onPress,focused,name,style}:TabIconsProps)=>{
  return (
    <Pressable 
    style={{
      alignItems:'center',
      justifyContent:"center",
      padding:7,
      borderRadius:8,
      borderWidth:focused?1:0,
      borderColor:focused?"#60a5fa":"transparent",
      backgroundColor:focused?"#1e293b":'transparent',
    }}
    onPress={onPress}
    >
    {getIconByName(name,focused)}
    </Pressable>
  )
}


export const SelectAccountIcon=({icon,onPress,focused,name}:TabIconsProps)=>{
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
    {getAccountIconByName(name,focused)}
    </Pressable>
  )
}


export const getIconByName=(name:string | null, focused:boolean,
  color?:string,
  size?:number
)=>{
  if(!name) return null 

  const found=CategoryIcons.find(c=>c.name===name)

  return found?found.symbol(focused,color,size):null
}

export const getAccountIconByName=(name:string | null,focused:boolean,color?:string,size?:number)=>{
  if(!name) return null 

  const found=AccountIcons.find(c=>c.name===name)

  return found?found.symbol(focused,color,size):null
}