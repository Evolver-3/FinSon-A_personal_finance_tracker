
import { generateInsights, getInsights, getInsightsByPeriod, getInsightSchedule } from "@/services/aiServices";
import { createContext,ReactNode } from "react";
import { useState,useEffect } from "react";

export const AiContext=createContext<AiContextProps| null>(null)

export const AiProvider=({children}:{children:ReactNode})=>{


  const [loading, setLoading] = useState(false);
  const [error,setError]=useState<string| null>(null)

      const handleError=(error:any)=>{
      const message=error?.response?.data?.message || error?.message || "Something went wrong"
  
      setError(message)
      throw error
  
    }


  
  const creatingInsights=async(period:Period)=>{
    try{
      setLoading(true)
      setError('')

      const res=await generateInsights(period)
      const datafetched=res.data

      const single=Array.isArray(datafetched)?datafetched[0]:datafetched

      console.log("hooks createInsights:", single)

      return single
      
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
      const datafetched=res.data

      const single=Array.isArray(datafetched)?datafetched[0]:datafetched

      console.log("hooks getInsights:", single)

      return single

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
      return res.data

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
      loading,
      error

    }}>
      {children}
    </AiContext.Provider>
  )


}