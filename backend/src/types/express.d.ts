import type {Role} from '@prisma/client'

declare global{
  namespace Express{
    interface Request{
      user?:{
        id:string 
        name:string 
        email:string 
        avatar:string | null
        role:Role
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