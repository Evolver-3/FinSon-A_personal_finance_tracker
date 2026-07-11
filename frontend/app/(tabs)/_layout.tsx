import { useAuthContext } from "@/context/AuthContext"
import { Redirect, Tabs } from "expo-router"
import { ActivityIndicator, View ,Text} from "react-native"
import { bottomTabData } from "@/data"
import { Plus } from "lucide-react-native"
import { useTheme } from "@/hooks/useTheme"


export default function TabsLayout() {
  const { user,loading } = useAuthContext()
  const {isDark}=useTheme()

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
              elevation:5,
              borderTopWidth:0,
              backgroundColor:isDark?"#383534":"#EDEDED",
              gap:0
            },
            tabBarItemStyle:{
              paddingVertical:5,
              flex:1

            }
          }}>
            
            {bottomTabData.map((data)=>{

              if(data.name==="Add"){
                return <Tabs.Screen 
                name="Add"
                options={{
                  tabBarIcon:({focused})=>(
                    <View style={{
                      width:60,
                      height:60,
                      borderRadius:28,
                      backgroundColor:focused?"#3DB0C2":"#36C9D1",
                      alignItems:"center",
                      justifyContent:"center",
                      marginBottom:30,
                      elevation:5,
                      shadowColor:"#36C9D1",
                      shadowOffset:{width:0,height:4},
                      shadowOpacity:0.4,
                      shadowRadius:8,
                      
                    }}>
                      <Plus color="#fff" size={28}/>
                    </View>
                  )
                }}/>
              }

              return(
              <Tabs.Screen
              key={data.id}
              name={data.name}
         
              options={{
                tabBarIcon:({focused})=>(
                  <TabIcon
                  text={data.text}
                  focused={focused}
                  icon={data.icon(focused ,24,isDark? (focused? "#AAAAAA":"#ffffff"):"#000000")} />
                )
              }}/>
              )
            })}
            </Tabs> 
}

type TabIconProps={
  focused:boolean 
  icon: React.ReactNode
  text:string
}

const TabIcon=({focused,icon,text}:TabIconProps)=>{
  const {isDark}=useTheme()
  return (
    <View className="flex-1 flex-col items-center mb-4"
    >
        {icon}
        
         <Text className=' text-font-extralight leading-tight text-center text-[10px] w-full'
        style={{
         color:focused ? (isDark?"#AAAAAA":"#0a0a0a") :( isDark?"#ffffff":"#000000")
        }}>{text}</Text>

    </View>
  )
}