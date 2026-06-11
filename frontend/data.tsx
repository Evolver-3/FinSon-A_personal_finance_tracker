import { Home, BadgePlus, UserRound, Banknote, ChartNoAxesCombinedIcon } from 'lucide-react-native'
import React from 'react'

type bottomTabDataProps={
  id:number 
  name:string 
  text:string 
  icon:(focused:boolean)=>React.ReactNode
  
}

export const bottomTabData:bottomTabDataProps[] = [
  {
    id: 1,
    name: "home",
    text: "Home",
    icon: (focused) => (
      <Home
        size={20}
        color={focused ? "#0a0a0a" : "#a3a3a3"}
        strokeWidth={focused ? 2.8 : 2}
      />
    )
  },
  {
    id: 2,
    name: "Add",
    text: "Add",
    icon: (focused) => (
      <BadgePlus
        size={20}
        color={focused ? "#0a0a0a" : "#a3a3a3"}
        strokeWidth={focused ? 2.8 : 2}
      />
    )
  },
  {
    id: 3,
    name: "profile",
    text: "Profile",
    icon: (focused) => (
      <UserRound
        size={20}
        color={focused ? "#0a0a0a" : "#a3a3a3"}
        strokeWidth={focused ? 2.8 : 2}
      />
    )
  },
  {
    id: 4,
    name: "Transactions",
    text: "Transactions",
    icon: (focused) => (
      <Banknote
        size={20}
        color={focused ? "#0a0a0a" : "#a3a3a3"}
        strokeWidth={focused ? 2.8 : 2}
      />
    )
  },
  {
    id: 5,
    name: "Budget",
    text: "Budget",
    icon: (focused: boolean) => (
      <ChartNoAxesCombinedIcon
        size={20}
        color={focused ? "#0a0a0a" : "#a3a3a3"}
        strokeWidth={focused ? 2.8 : 2}
      />
    )
  }
]



export const categoryColors=["#E01919","#E8CF13","#3AE813","#13DDE8"] 