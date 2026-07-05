import { useContext } from "react";
import {BudgetContext} from '@/context/BudgetContext'

export const useBudget=():BudgetContextType=>{
  const context=useContext(BudgetContext)

  if(!context){
    throw new Error("useBudget must be within the BudgetProvider")
  }
  return context
}