import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "../context/AuthContext";

import { BudgetProvider } from "@/context/BudgetContext"
import { TransactionProvider } from "@/context/TransactionContext";
import { useAppFonts } from "@/hooks/useAppFonts";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function RootLayout(){

  const fontsLoaded=useAppFonts()

  if(!fontsLoaded) return null;

  return(
    <AuthProvider>
      <BudgetProvider>
        <TransactionProvider>
          <CurrencyProvider>
        <Stack
      screenOptions={{
      headerShown:false
      }}/>
      </CurrencyProvider>
      </TransactionProvider>
      </BudgetProvider>
    </AuthProvider>
  )
}