import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "../context/AuthContext";

import { BudgetProvider } from "@/context/BudgetContext"
import { TransactionProvider } from "@/context/TransactionContext";
import { useAppFonts } from "@/hooks/useAppFonts";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenStorage } from "@/services/tokenStorage";
import { AuthTokenSync } from "@/components/AuthTokenSync";

export default function RootLayout(){

  const fontsLoaded=useAppFonts()

  if(!fontsLoaded) return null;
  
  return(
    <ClerkProvider 
    publishableKey={
      process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
    }
    tokenCache={tokenStorage}>
    <AuthTokenSync/>
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
    </ClerkProvider>
  )
}