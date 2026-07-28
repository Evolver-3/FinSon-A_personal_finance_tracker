import { getMe } from "@/services/authServices";
import { useAuth } from "@clerk/clerk-expo";


export function useCurrentUser(){
  const {getToken,isSignedIn}=useAuth()

  const fetchCurrentUser=async()=>{
    if(!isSignedIn) return null 

    try{
      const token=await getToken()
      if(!token){
        return null;
      }
      const data=await getMe(token)
      console.log("getMe returned:", data)

      if(!data){
        return null
      }
      

    }catch(err){
      console.log("fetchCurrentUser:", err)
    return null
    }

  }

  return {fetchCurrentUser}
}