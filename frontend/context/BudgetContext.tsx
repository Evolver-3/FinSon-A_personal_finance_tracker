import { createContext,ReactNode,useState,useEffect ,useContext} from "react";
import { createBudget, updateBudget, deleteBudget, checkSpending } from "@/services/budgetServices";
import {useAuth as useClerkAuth} from '@clerk/clerk-expo'
import { useGuest } from "@/hooks/useGuest";

export const BudgetContext=createContext<BudgetContextType | null>(null)

export const BudgetProvider=({children}:{children:ReactNode})=>{

  const {isSignedIn}=useClerkAuth()
  const guest=useGuest()

  const isGuest=!isSignedIn

    const [budgets,setbudgets]=useState<Budget[]>(isGuest?guest.budgets:[])
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
  
    const handleError=(error:any)=>{
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
      setError(message)
      throw error
    }

    useEffect(()=>{
      if(isGuest){
        setbudgets(guest.budgets)
          }
        },[guest.budgets,isGuest])
    
  
    const creatingNewBudget=async(data:createBudgetProps)=>{
       setLoading(true)
        setError(null)
      try{
        const newBudget:Budget={
          id:Date.now().toString(),
          ...data,
          createdAt:new Date().toISOString()
        }
        if(isGuest){
          guest.addBudget(newBudget)
        }
       
  
        await createBudget(data)
  
        const now=new Date()
        await spendingBudget(now.getMonth()+1,now.getFullYear())
   
      }catch(error:any){
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
      const editBudget=async(id:string,data:updateBudgetProps)=>{
      try{
        setLoading(true)
        setError(null)
        await updateBudget(id,data)
  
        const now=new Date()
        await spendingBudget(now.getMonth()+1,now.getFullYear())
  
      }catch(error:any){
        
        handleError(error)
  
      }finally{
        setLoading(false)
      }
    }
  
      const removeBudget=async(id:string)=>{
      try{
        setLoading(true)
        setError(null)
        console.log("hooks::", id)
        await deleteBudget(id)
        console.log("deleted successfully...")
  
  
        const now=new Date()
        console.log("fetching spending...")
        await spendingBudget(now.getMonth()+1,now.getFullYear())
        console.log("spending fetching ...")
      }catch(error:any){
   
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
    const spendingBudget=async(month:number,year:number)=>{
      try{
        setLoading(true)
        setError(null)
        const res=await checkSpending(month,year)
  
        setbudgets(res.data)
        return res.data
        
      }catch(error:any){
        handleError(error)
   
      }finally{
        setLoading(false)
      }
    }
  
    useEffect(()=>{
      const now=new Date()
      spendingBudget(now.getMonth()+1,now.getFullYear())
    },[])

    return (
      <BudgetContext.Provider 
      value={{
        budgets,loading,error,spendingBudget,creatingNewBudget,removeBudget,editBudget
        }}>
        {children}
      </BudgetContext.Provider>
    )
}

