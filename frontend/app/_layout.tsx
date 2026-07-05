import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "../context/AuthContext";

import { BudgetProvider } from "@/context/BudgetContext"

export default function RootLayout(){

  return(
    <AuthProvider>
      <BudgetProvider>
        <Stack
      screenOptions={{
      headerShown:false
      }}/>
      </BudgetProvider>
    </AuthProvider>
  )
}