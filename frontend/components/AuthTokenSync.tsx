import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import {api} from "@/services/api";
import { setClerkTokenGetter } from "@/services/clerkTokenManager";

export const AuthTokenSync = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    
    if(!isLoaded)return;

    if(!isSignedIn){
      setClerkTokenGetter(async()=>null)
      return
    }

    setClerkTokenGetter(()=>getToken())
  }, [isLoaded, isSignedIn,getToken]);

  return null;
};