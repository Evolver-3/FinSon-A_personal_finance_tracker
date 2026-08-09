import { handleError } from "@/lib/handleError";
import { generateInsights, getInsights, getInsightsByPeriod, getInsightSchedule } from "@/services/aiServices";
import { createContext,ReactNode } from "react";
import { useState,useEffect } from "react";

export const AiContext=createContext<AiContextProps| null>(null)

export const AiProvider=({children}:{children:ReactNode})=>{

  const [wholeData,setWholeData]=useState<InsightDataProps[]>([])
  const [existData,setExistData]=useState<InsightDataProps | null>(null)

  const [aiPeriodData,setAiPeriodData]=useState<aiPeriodDataProps[]>([{
    id:"",
    period:"month",
    insightPeriodically:[]
  }])

  const [loading, setLoading] = useState(false);
  const [error,setError]=useState<string| null>(null)


  
  const creatingInsights=async(period:Period)=>{
    try{
      setLoading(true)
      setError('')

      const res=await generateInsights(period)
      console.log("hooks ai data response:",res.data)

      setWholeData((prev)=>[res.data,...prev])
      return res.data
      
    }catch(error:any){
      handleError(error)
      return null
    }finally{
      setLoading(false)

    }
  }

  const foundInsights=async(period:Period)=>{

    try{
      setLoading(true)
      setError("")
      
      const res=await getInsights(period)

      setExistData(res.data)

      console.log("hooks getInsights:", res.data)

      return res.data

    }catch(error:any){
      handleError(error)
      return null
    }finally{
      setLoading(false)
    }
  }

  const insightSchedule=async(data:InsightScheduleProps)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getInsightSchedule({data})

      console.log("hooks schedule res:", res.data)

    }catch(error:any){
      handleError(error)
      throw null

    }finally{
      setLoading(false)

    }   
  }

  const insightsByPeriod=async(period:Period)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getInsightsByPeriod(period)
      console.log("hooks working:", res.data)

      

      setAiPeriodData(res.data)
      return res.data

    }catch(err:any){
      handleError(err)
      throw null
    }finally{
      setLoading(false)
    }
  }

  return(
    <AiContext.Provider value={{
      creatingInsights,
      foundInsights,
      insightSchedule,
      insightsByPeriod,
      wholeData,
      aiPeriodData,
      loading,
      error,
      existData

    }}>
      {children}
    </AiContext.Provider>
  )


}