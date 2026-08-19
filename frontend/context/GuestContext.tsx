import { createContext,useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GuestContext=createContext<GuestContextProps | null>(null)

export const GuestProvider=({children}:{children:React.ReactNode})=>{

  const [isGuest,setIsGuest]=useState(false)
  const [accounts,setAccounts]=useState<Account[]>([])
  const [categories,setCategories]=useState<Category[]>([])
  const [transactions,setTransactions]=useState<Transaction[]>([])
  const [budgets,setBudgets]=useState<Budget[]>([])
  const [preferences,setPreferences]=useState({
    currencyCode:'USD',
    currencySymbol:'$',
    theme:'system'
  })
  const [error,setError]=useState<string| null>(null)

  const handleError=(error:any)=>{
  const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
  setError(message)
  throw error
  }

  useEffect(()=>{
    const loadGuest=async()=>{

      try{
      const stored=await AsyncStorage.getItem('@guest_data')
      if(stored){
        const parsed=JSON.parse(stored)

        setAccounts(parsed.accounts ||[])
        setCategories(parsed.categories || [])
        setTransactions(parsed.transactions || [])
        setPreferences(parsed.preferences || {})
        setBudgets(parsed.budgets || [])
      }
    }catch(err:any){
      console.log("Failed to load guest data:",err)
      handleError(err)
      return null
    }
    }
    if(isGuest){
      loadGuest()
    }
    
  },[isGuest])

  useEffect(()=>{

    if(!isGuest) return;

    const saveGuestData=async()=>{
    try{
      AsyncStorage.setItem('@guest_data',JSON.stringify({
      accounts,
      categories,
      transactions,
      budgets,
      preferences
    }))

    }catch(err:any){
      console.log("error in saving data in asyncStorage:",err)
      handleError(err)
      throw null
    }
  }

  saveGuestData()
    
  },[accounts,categories,transactions,preferences,isGuest])

  const clearGuestData=async()=>{
    await AsyncStorage.removeItem('@guest_data')
    setAccounts([])
    setCategories([])
    setTransactions([])
    setBudgets([])
    setIsGuest(false)
  }

const enterGuestMode = async () => {
  console.log("Are we here:");

  await AsyncStorage.setItem("@app_mode", "guest");

  const storedMode = await AsyncStorage.getItem("@app_mode");
  console.log("stored mode:", storedMode); // should be "guest"

  setIsGuest(true);
};

  useEffect(()=>{
    const loadMode=async()=>{
      const mode=await AsyncStorage.getItem("@app_mode")

      if(mode==="guest"){
        setIsGuest(true)
      }
    }
    loadMode()
  },[])

  const addAccount=(newAccount:Account)=>{
    setAccounts((prev)=>{
      const updated =[newAccount,...prev]
      return updated;
    })
  }

  const removeAccount=(id:string)=>{
    setAccounts((prev)=>{
      const updated=prev.filter((acc)=>acc.id!==id)
      return updated
    })
  }

  const updatedAccount=(id:string,data:Partial<Account>)=>{
    setAccounts((prev)=>{
      const updated=prev.map((acc)=>acc.id===id?{...acc,...data}:acc)
    return updated
    }
  )
  }

  const addCategory=(newCategory:Category)=>{
    setCategories((prev)=>{
      const updated=[newCategory, ...prev]
      return updated
    })
  }

  const removeCategory=(id:string)=>{
    setCategories((prev)=>{
      const updated=prev.filter((cat)=>cat.id!==id)

      return updated
    })
  }

  const updatedCategory=(id:string,data:Partial<Category>)=>{
    setCategories((prev)=>{
      const updated=prev.map((cat)=>cat.id===id?{...cat,...data}:cat)
      return updated
    })
  }

  const addTransaction=(newTransaction:Transaction)=>{
    setTransactions((prev)=>{
      const updated=[newTransaction, ...prev]
      return updated
    })
  }

  const removeTransaction=(id:string)=>{
    setTransactions((prev)=>{
      const updated=prev.filter((tran)=>tran.id!==id)
      return updated
    })
  }

  const updatedTransaction=(id:string,data:Partial<Transaction>)=>{
    setTransactions((prev)=>{
      const updated=prev.map((tran)=>tran.id===id?{...tran,...data}:tran)
      return updated
    })
  }

  const addBudget=(newBudget:Budget)=>{
    setBudgets((prev)=>{
      const created=[newBudget,...prev]
      return created
    })
  }

  const removeBudget=(id:string)=>{
    setBudgets((prev)=>{
      const updated=prev.filter((bud)=>bud.id!==id)
      return updated
    })
  }

  const updatedBudget=(id:string,data:Partial<Budget>)=>{
    setBudgets((prev)=>{
      const updated=prev.map((bud)=>bud.id===id?{...bud,...data}:bud)
      return updated
    })
  }

  return(
    <GuestContext.Provider value={{accounts,categories,transactions,budgets,preferences,isGuest,setIsGuest,
      addAccount,addCategory,addTransaction,
      removeAccount,updatedAccount,removeCategory,updatedCategory,removeTransaction,updatedTransaction,enterGuestMode,addBudget,removeBudget,updatedBudget
      
    }}>
      {children}
    </GuestContext.Provider>
  )
 
}