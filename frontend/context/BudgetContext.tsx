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
    const [transactions, setTransactions]=useState<Transaction[]>(guest.transactions)
  
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<string|null>(null)
  
    useEffect(()=>{
    if(!isGuest){
      const now=new Date()
      spendingBudget(now.getMonth()+1,now.getFullYear())
      }else{
        setbudgets(guest.budgets)
      }
    },[guest.budgets,isGuest])

      useEffect(() => {
      setbudgets(prev => prev.map(budget => {
      const spent = transactions
        .filter(t => 
        t.categoryId === budget.categoryId &&
        t.type === 'EXPENSE'
        )
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return { ...budget, spent };
      }));
    }, [transactions])

    const handleError=(error:any)=>{
      const message=isGuest?'Failed to save locally. Storage may be full.':error?.message?.data?.message || error?.message || "Something went wrong"
  
      setError(message)
      throw error
    }

    
    const creatingNewBudget=async(data:createBudgetProps)=>{
       setLoading(true)
        setError(null)
      try{

        if(isGuest){
          const category=guest.categories.find(c=>c.id===data.categoryId)
          
          const now=new Date()

          const spent=guest.transactions.filter(t=>t.categoryId===data.categoryId &&
            t.type==="EXPENSE"
          ).reduce((sum,t)=>sum+Number(t.amount),0)

          const newBudget:Budget={
          id:Date.now().toString(),
          ...data,
          spent:spent,
          category:category,
          createdAt:new Date().toISOString()
        }
        console.log("created balue",newBudget)
          guest.addBudget(newBudget)
        }
       
        const res=await createBudget(data)
        setbudgets((prev)=>[res.data,...prev])
  
        const now=new Date()
        await spendingBudget(now.getMonth()+1,now.getFullYear())
   
      }catch(error:any){
        handleError(error)
      }finally{
        setLoading(false)
      }
    }
  
      const editBudget=async(id:string,data:updateBudgetProps)=>{
        setLoading(true)
        setError(null)
      try{
        if(isGuest){
          guest.updatedBudget(id,data)
        }
         setbudgets((prev)=>
          prev.map((bud)=>(bud.id===id?{...bud,...data}:bud)))

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
        setLoading(true)
        setError(null)
      try{
        if(isGuest){
          guest.removeBudget(id)
        }
        await deleteBudget(id)
  
        const now=new Date()
        await spendingBudget(now.getMonth()+1,now.getFullYear())
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

    return (
      <BudgetContext.Provider 
      value={{
        budgets,loading,error,spendingBudget,creatingNewBudget,removeBudget,editBudget
        }}>
        {children}
      </BudgetContext.Provider>
    )
}

