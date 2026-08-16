import { GuestContext } from "@/context/GuestContext"
import { useContext } from "react"

export const useGuest=()=>{
  const context=useContext(GuestContext)

  if(!context){
    throw new Error('useGuest must be used within GuestProvider')
  }
  
  return context
}