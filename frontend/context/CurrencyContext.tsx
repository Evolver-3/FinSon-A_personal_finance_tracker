import { countryCurrencyData } from "@/data";
import { createContext, useContext, useMemo, useState } from "react";

const CurrencyContext=createContext<CurrencyContextType| null>(null)

export const CurrencyProvider=({children}:{children:React.ReactNode})=>{
  const [countryName,setCountryName]=useState("India")

  const currency=useMemo(()=>{
    return countryCurrencyData.find((item)=>item.country===countryName)
  },[countryName])

  return(
    <CurrencyContext.Provider
    value={{
      countryName,
      setCountryName,
      symbol:currency?.symbol ?? "₹",
      currencyCode:currency?.currencyCode ?? "INR"
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency=()=>{
  const context=useContext(CurrencyContext)

  if(!context){
    throw new Error("useCurrency must be used inside CurrencyProvider")
  }

  return context
}