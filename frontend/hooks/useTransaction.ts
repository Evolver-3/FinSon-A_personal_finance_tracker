import { useContext } from "react";
import { TransactionContext } from "@/context/TransactionContext";

export const useTransaction=():TransactionContextType=>{
  const context=useContext(TransactionContext)

  if(!context){
    throw new Error("useTransaction must be with in TransactionProvider")
  }

  return context

}