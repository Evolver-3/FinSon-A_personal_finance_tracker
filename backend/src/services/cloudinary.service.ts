import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../constant/cloudinary.js";
import streamifier from 'streamifier'


const uploadToStream=(fileBuffer:Buffer):Promise<UploadApiResponse>=>{
  return new Promise((resolve,reject)=>{
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type:"image",
        transformation:[
          {
            width:300,
            height:300,
            crop:"fill",
            gravity:"face",
            quality:"auto",
            fetch_format:"auto"
          }
        ]
      },
      (error,result)=>{
        if(error)return reject(error)
        if(!result) return(new Error("Cloudinary upload failed"))
          resolve(result)
      }
    )
    
    streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}

export const uploadToCloudinary=async(fileBuffer:Buffer)=>{
  try{
    const result=await uploadToStream(fileBuffer)

    return{
      url:result.secure_url,
      publicId:result.public_id
    }
  }catch(error){
    throw error
  }
}