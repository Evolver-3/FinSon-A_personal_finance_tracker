import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "../context/AuthContext";

import { BudgetProvider } from "@/context/BudgetContext"
import { TransactionProvider } from "@/context/TransactionContext";
import { useAppFonts } from "@/hooks/useAppFonts";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenStorage } from "@/services/tokenStorage";
import { AuthTokenSync } from "@/components/mainUi/AuthTokenSync";
import { AiProvider } from "@/context/AiContext";
import { GuestProvider } from "@/context/GuestContext";

export default function RootLayout(){

  const fontsLoaded=useAppFonts()

  if(!fontsLoaded) return null;
  
  return(
    <GuestProvider>
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
              <AiProvider>
              <Stack
              screenOptions={{
              headerShown:false
              }}/>
              </AiProvider>
            </CurrencyProvider>
          </TransactionProvider>
        </BudgetProvider>
      </AuthProvider>
    </ClerkProvider>
    </GuestProvider>
  )
}