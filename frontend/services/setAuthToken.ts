import {api} from './api'
export const setAuthToken=async (token:string | null)=>{
  if(token){
    api.defaults.headers.common.Authorization=`Bearer ${token}`
  }else{
    delete api.defaults.headers.common.Authorization
  }
}