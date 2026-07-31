import { generateInsights } from "@/services/aiServices"
import { useState } from "react"

export const useAiHook=()=>{

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

    const handleError=(error:any)=>{

    console.log("=== FULL ERROR ===")
    console.log(error)
    console.log("error.response:", error?.response)
    console.log("error.response?.data:", error?.response?.data)
    const message=error?.message?.data?.message || error?.message || "Something went wrong"

    setError(message)
  }

  const creatingInsights=async(period:Period)=>{
    try{
      setLoading(true)
      setError('')

      const res=await generateInsights(period)
      console.log("hooks ai data response:",res.data)
      return res.data
      
    }catch(error:any){
      handleError(error)
      return null
    }finally{
      setLoading(false)

    }
  }
  return {
    error,loading,creatingInsights
  }
}