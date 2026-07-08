import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "../context/AuthContext";

import { BudgetProvider } from "@/context/BudgetContext"
import { TransactionProvider } from "@/context/TransactionContext";
import { useAppFonts } from "@/hooks/useAppFonts";

export default function RootLayout(){

  const fontsLoaded=useAppFonts()

  if(!fontsLoaded) return null;

  return(
    <AuthProvider>
      <BudgetProvider>
        <TransactionProvider>
        <Stack
      screenOptions={{
      headerShown:false
      }}/>
      </TransactionProvider>
      </BudgetProvider>
    </AuthProvider>
  )
}