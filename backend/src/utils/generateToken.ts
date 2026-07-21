import jwt from 'jsonwebtoken'
import env from '../constant/env.js'


export const generateAccessAndRefreshTokens=(userId:string)=>{

  const accessToken=jwt.sign(
  {id:userId},
  env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:"1h"
  }
  )

  const refreshToken=jwt.sign(
  {id:userId},
  env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:"7d"
  }
  )

  return{
    accessToken,refreshToken
  }

}