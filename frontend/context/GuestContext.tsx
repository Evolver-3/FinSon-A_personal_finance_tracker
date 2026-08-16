import { createContext,useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GuestContext=createContext<GuestContextProps | null>(null)

export const GuestProvider=({children}:{children:React.ReactNode})=>{

  const [isGuest,setIsGuest]=useState(false)
  const [accounts,setAccounts]=useState<Account[]>([])
  const [categories,setCategories]=useState<Category[]>([])
  const [transactions,setTransactions]=useState<Transaction[]>([])
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
    setIsGuest(false)
  }

  const addAccount=(newAccount:Account)=>{
    setAccounts((prev)=>{
      const updated =[newAccount,...prev]
      AsyncStorage.setItem('@guest_accounts',JSON.stringify(updated))
      return updated;
    })
  }
  const removeAccount=(id:string)=>{
    setAccounts((prev)=>{
      const updated=prev.filter((acc)=>acc.id!==id)
      AsyncStorage.setItem('@guest_accounts',JSON.stringify(updated))
      return updated
    })
  }

  const updatedAccount=(id:string,data:Partial<Account>)=>{
    setAccounts((prev)=>{
      const updated=prev.map((acc)=>acc.id===id?{...acc,...data}:acc)
    
    AsyncStorage.setItem('@guest_accounts',JSON.stringify(updated))
    return updated
    }
  )
  }


  const addCategory=(newCategory:Category)=>{
    setCategories((prev)=>{
      const updated=[newCategory, ...prev]
      AsyncStorage.setItem('@guest_data',JSON.stringify(updated))
      return updated
    })
  }

  const addTransaction=(newTransaction:Transaction)=>{
    setTransactions((prev)=>{
      const updated=[newTransaction, ...prev]
      AsyncStorage.setItem('@guest_data',JSON.stringify(updated))
      return updated
    })
  }

  return(
    <GuestContext.Provider value={{accounts,categories,transactions,preferences,isGuest,addAccount,addCategory,addTransaction,
      removeAccount,updatedAccount
      
    }}>
      {children}
    </GuestContext.Provider>
  )
 
}