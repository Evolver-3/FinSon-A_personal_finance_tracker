import {api} from './api'

export const generateInsights=async(period:string)=>{
  const res=await api.post(`/ai/insights?period=${period}`
  )

  console.log("ai service created, call from service :", res.data)
  return res.data
}

export const getInsights=async(period:string)=>{
  const res=await api.get(`/ai/insights/period?period=${period}`)

  console.log("insight founded, call from service:", res.data)
  return res.data
}