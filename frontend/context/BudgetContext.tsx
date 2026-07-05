import { createContext,ReactNode,useState,useEffect ,useContext} from "react";
import { createBudget, updateBudget, deleteBudget, checkSpending } from "@/services/budgetServices";

export const BudgetContext=createContext<BudgetContextType | null>(null)

export const BudgetProvider=({children}:{children:ReactNode})=>{

    const [budgets,setbudgets]=useState<Budget[]>([])
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
  
    const handleError=(error:any)=>{
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
      setError(message)
      throw error
  
    }
  
    const creatingNewBudget=async(data:createBudgetProps)=>{
      try{
        setLoading(true)
        setError(null)
  
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

