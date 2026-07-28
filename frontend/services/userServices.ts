import {api} from './api'


export const profileUpdate=async(data:{name:string})=>{
  const res=await api.patch("/user/profile-update",data)
 
  return res.data
}

export const changeAvatar = async (data: FormData) => {
  const res = await api.patch("/user/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data", // keep this
      "Accept": "application/json",
    },
  
    transformRequest: (data) => data,
  })
  console.log(res.data)
  return res.data
}