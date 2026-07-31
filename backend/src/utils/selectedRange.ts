export type Period='day'|'week'|'month'|'quarter'|'year'

export const getRange=(period:Period)=>{
  const now=new Date()
  const start=new Date()

  switch(period){
    case "day": 
      start.setHours(0,0,0,0)
      break;
    case "week":
      start.setDate(now.getDate()-7)
      break;
    case "month":
      start.setMonth(now.getMonth()-1)
      break;
    case "quarter":
      start.setMonth(now.getMonth()-3)
      break;
    case "year":
      start.setFullYear(now.getFullYear()-1)
      break;
  }

  return {start,end:now}
}

export const getPeriodLabel=(period:Period)=>{
  const labels={
    day:"Today",
    week:"This Week",
    month:"This Month",
    quarter:"This Quarter",
    year:"This Year"
  }
  return labels[period]
}