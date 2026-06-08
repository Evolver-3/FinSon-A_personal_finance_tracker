import { useAuthContext } from "@/context/AuthContext"
import { Redirect, Tabs } from "expo-router"
import { ActivityIndicator, View ,Text} from "react-native"
import {BadgePlus, Banknote, ChartNoAxesCombinedIcon, Home, UserRound} from 'lucide-react-native'

type TabIconProps={
  focused:boolean 
  icon:React.ReactNode
  text:string
}

const TabIcon=({focused,icon,text}:TabIconProps)=>{
  return (
    <View className={`h-10 w-10 items-center justify-center rounded-full ${focused?"#a3a3a3":"bg-transparent"}`}>
      {icon}
      <View>
        <Text>{text}</Text>
      </View>

    </View>
  )
}

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
              height:80,
              marginHorizontal:"auto",
              borderRadius:0,
              borderTopStartRadius:10,
              borderTopEndRadius:10,
              elevation:0,
              borderTopWidth:0,
              backgroundColor:"#383534"
            },
            tabBarItemStyle:{
              paddingVertical:20
            }
          }}>
            <Tabs.Screen
            name="home"
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={'Home'}
                focused={focused}
                icon={
                  <Home
                  size={22}
                  color={focused?"#0a0a0a":"#a3a3a3"}
                  strokeWidth={focused?2.8:2}
                />
            }/>

            
          )
            }}/>

            <Tabs.Screen
            name="Add"
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={'Add'}
                focused={focused}
                icon={
                  <BadgePlus
                  size={22}
                  color={focused?"#0a0a0a":"#a3a3a3"}
                  strokeWidth={focused?2.8:2}
                />
            }/>
            )}}/>

            <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={'Profile'}
                focused={focused}
                icon={
                  <UserRound
                  size={22}
                  color={focused?"#0a0a0a":"#a3a3a3"}
                  strokeWidth={focused?2.8:2}
                />
            }/>
            )}}/>

            <Tabs.Screen
            name="Transactions"
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={'Transactions'}
                focused={focused}
                icon={
                  <Banknote
                  size={22}
                  color={focused?"#0a0a0a":"#a3a3a3"}
                  strokeWidth={focused?2.8:2}
                />
            }/>
            )}}/>

            <Tabs.Screen
            name="Budget"
            options={{
              tabBarIcon:({focused})=>(
                <TabIcon
                text={'Budget'}
                focused={focused}
                icon={
                  <ChartNoAxesCombinedIcon
                  size={22}
                  color={focused?"#0a0a0a":"#a3a3a3"}
                  strokeWidth={focused?2.8:2}
                />
            }/>
            )}}/>

            
            </Tabs>
}


