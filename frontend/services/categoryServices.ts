import {api} from './api'

export const createCategory=async(data: createCategoryProps)=>{
  const res=await api.post("/category",data)
  return res.data
}

export const getCategories=async()=>{
  const res=await api.get("/category")
  return res.data
}

export const getCategory=async(categoryId:string)=>{
  const res=await api.get(`/category/${categoryId}`)
  return res.data
}


export const updateCategory=async(categoryId:string,data:updateCategoryProps)=>{
  const res=await api.patch(`/category/${categoryId}`,data)
  return res.data
}

export const deleteCategory=async(categoryId:string)=>{
  const res=await api.delete(`/category/${categoryId}`)
  return res.data
} 