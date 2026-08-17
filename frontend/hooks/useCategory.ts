import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "@/services/categoryServices";
import { useState,useEffect } from "react";
import {useAuth as useClerkAuth} from '@clerk/clerk-expo'
import { useGuest } from "./useGuest";

export const useCategory=()=>{
  const {isSignedIn}=useClerkAuth()
  const guest=useGuest()

  const isGuest=!isSignedIn

  const [categories,setCategories]=useState<Category[]>(isGuest?guest.categories:[])

  const [selectedCategory,setSelectedCategory]=useState<Category | null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)

  useEffect(()=>{
    if(isGuest){
      setCategories(guest.categories)
    }
  },[guest.categories,isGuest])

  useEffect(()=>{
    if(!isGuest){
      fetchAllCategory()
    }
  },[isGuest])

  const handleError=(error:any)=>{
    const message=error?.message?.data?.message || error?.message || "Something went wrong"

    setError(message)
    throw error 
  }

  const creatingCategory=async(data:createCategoryProps)=>{
      setLoading(true)
      setError(null)
    try{
      const newCategory:Category={
        id:Date.now().toString(),
        ...data,
        createdAt:new Date().toISOString()
      }

      if(isGuest){
        guest.addCategory(newCategory)
      }

      const res=await createCategory(data)
      console.log("category created:",res.data)

      setCategories((prev)=>[res.data, ...prev])

      return res.data

    }catch(error:any){
      
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  const fetchAllCategory=async()=>{
    if(isGuest) return guest.categories
      setLoading(true)
      setError(null)

    try{

      const res=await getCategories()
      setCategories(res.data)

      return res.data


    }catch(error:any){
     
      handleError(error)
    }finally{
      setLoading(false)
    }
  }

  const fetchCategory=async(id:string)=>{
    
    if(isGuest){
      const found=guest.categories.find((c)=>c.id===id) || null
      setSelectedCategory(found)
      return found
    }
    try{
      setLoading(true)
      setError(null)

      const res=await getCategory(id)

      console.log("fetchSingle--res.data",res.data)

      console.log("fetchSingle--res.data.data",res.data.data)

      setSelectedCategory(res.data)

      return res.data


    }catch(error:any){
     handleError(error)

    }finally{
      setLoading(false)
    }
  }

  const editCategory=async(id:string,data:updateCategoryProps)=>{
      setLoading(true)
      setError(null)
    try{
      if(isGuest){
        guest.updatedCategory(id,data)

        setCategories((prev)=>
        prev.map((cat)=>cat.id===id?{...cat,...data}:cat))
        setSelectedCategory((prev)=>
        prev?.id===id?{...prev,...data}:prev)

        return {...selectedCategory,...data} as Category
      }

      const res=await updateCategory(id,data)
      console.log("edit category:",res)

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
      setLoading(true)
      setError(null)
    try{

      if(isGuest){
        guest.removeCategory(id)
        setSelectedCategory((prev)=>(prev?.id===id?null:prev))
        return
      }
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