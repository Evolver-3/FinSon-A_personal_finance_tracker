import type {Role} from '@prisma/client'

declare global{
  namespace Express{
    interface Request{
      clerkUserId?:string
      user?:{
        id:string 
        name?:string 
        email?:string 
        avatar?:string | null
      }
    }
  }

  type AccessTokenPayload={
    id:string
  }

  type TokenPayload={
    id:string
  }
}

export {}