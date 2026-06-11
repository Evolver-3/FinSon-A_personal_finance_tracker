import { useAuthContext } from "@/context/AuthContext"
import { Redirect, Tabs } from "expo-router"
import { ActivityIndicator, View ,Text} from "react-native"
import { bottomTabData } from "@/data"



export default function TabsLayout() {
  const { user,loading } = useAuthContext()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />
  }


  return <Tabs 
          screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{
              position:'absolute',
              bottom:0,
              height:60,
              borderRadius:0,
              borderTopStartRadius:10,
              borderTopEndRadius:10,
              elevation:0,
              borderTopWidth:0,
              backgroundColor:"#383534",
              gap:0
            },
            tabBarItemStyle:{
              paddingVertical:10,
              flex:1

            }
          }}>
            {bottomTabData.map((data)=>(
            <Tabs.Screen
            key={data.id}
            name={data.name}
         
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={data.text}
                focused={focused}
                icon={data.icon(focused)} />
              )
            }}/>
           ))}
            </Tabs> 
}



type TabIconProps={
  focused:boolean 
  icon: React.ReactNode
  text:string
}

const TabIcon=({focused,icon,text}:TabIconProps)=>{
  return (
    <View className="flex-1 items-center justify-center"
    >
      <View>
        {icon}
      </View>
        <View>
          <Text className=' text-font-extralight leading-tight text-center text-[10px]'
        style={{
         color:focused ? "#0a0a0a" : "#a3a3a3"
        }}>{text}</Text>
        </View>
      
    </View>
  )
}