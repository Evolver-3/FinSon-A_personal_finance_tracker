import {api} from './api'

export const generateInsights=async(period:string)=>{
  const res=await api.post(`/ai/insights?period=${period}`
  )

  console.log("ai service frontend call :", res.data)
  return res.data
}