export const formatDate=(date?:string)=>{
  if(!date) return "";

  return new Date(date).toLocaleDateString("en-GB",{
    day:"numeric",
    month:"long",
    year:"numeric"
  })
}

export const formatAmount=(amount:Number | string)=>{
  return Number(amount).toLocaleString("en-IN");
}

export const formatMonth=(month?:number)=>{
  if(!month) return '';

  return new Date(month).toLocaleDateString("en-GB",{
    month:"long"
  })
}