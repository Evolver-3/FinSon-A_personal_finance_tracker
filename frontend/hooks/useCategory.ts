import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "@/services/categoryServices";
import { useState,useEffect } from "react";

export const useCategory=()=>{

  const [categories,setCategories]=useState<Category[]>([])
  const [selectedCategory,setSelectedCategory]=useState<Category | null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  const handleError=(error:any)=>{
    const message=error?.message?.data?.message || error?.message || "Something went wrong"

    setError(message)
    throw error 
  }

  const creatingCategory=async(data:createCategoryProps)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await createCategory(data)

      setCategories((prev)=>[res.data, ...prev])

      return res.data

    }catch(error:any){
      
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  const fetchAllCategory=async()=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getCategories()

      setCategories(res.data)

      return res.data


    }catch(error:any){
     
      handleError(false)
    }finally{
      setLoading(false)
    }
  }

  const fetchCategory=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)

      const res=await getCategory(id)

      setSelectedCategory(res.data)

      return res.data


    }catch(error:any){
     handleError(error)

    }finally{
      setLoading(false)
    }
  }

  const editCategory=async(id:string,data:updateCategoryProps)=>{
    try{
      setLoading(true)
      setError(null)
      const res=await updateCategory(id,data)

      setCategories((prev)=>
      prev.map((category)=>(category.id === id ? res.data:category)))
      
      setSelectedCategory((prev)=>
      prev?.id === id? res.data: prev)

      return res.data


    }catch(error:any){
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  const removeCategory=async(id:string)=>{
    try{
      setLoading(true)
      setError(null)
      await deleteCategory(id)

      setCategories((prev)=>prev.filter((category)=>category.id !==id))

      setSelectedCategory((prev)=>
      prev?.id === id? null :prev)


    }catch(error:any){
     
      handleError(error)

    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllCategory()
  },[])

  return {
    loading,
    error,
    fetchAllCategory,
    fetchCategory,
    editCategory,
    creatingCategory,
    removeCategory,
    categories,
    selectedCategory
  }
}