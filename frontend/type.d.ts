declare global{

  interface registrationProps{
    name:string 
    email:string
    password:string
  }

  interface loginProps{
    email:string 
    password:string
  }

  interface changePasswordProps{
    currentPassword:string 
    newPassword:string 
    confirmNewPassword:string
  }

  interface resetPasswordProps{
    newPassword:string 
    confirmNewPassword:string
  }

  interface createAccountProps{
    name:string 
    type:"CASH" | "BANK" | "CARD" | "WALLET" 
    balance?:number
  }

  interface updateAccountProps{
    name?:string 
    type?:"CASH" | "BANK" | "CARD" | "WALLET" 
    balance?:number
  }

  interface createCategoryProps{
    name:string
    color?:string
    icon?:string
    type:"INCOME" | "EXPENSE"
  }

  interface updateCategoryProps{
    name?:string
    color?:string
    icon?:string
    type?:"INCOME" | "EXPENSE"
  }

  interface createTransactionProps{
    title:string 
    amount:number
    type:"INCOME" | "EXPENSE"
    note?:string 
    date?:string
    accountId:string
    categoryId:string

  }

  interface updateTransactionProps{
    title?:string 
    amount?:number 
    type?:"INCOME" | "EXPENSE" 
    note?:string 
    date?:string
    accountId?:string
    categoryId?:string
  }

  interface createBudgetProps{
    amount:number 
    month:number 
    year:number 
    categoryId:string

  }

  interface updateBudgetProps{
    amount?:number 
    month?:number 
    year?:number 
    categoryId?:string
  }

  type User={
    id:string 
    name:string 
    email:string 
    avatar:string | null
    role:"USER"| "ADMIN"
    emailVerified:boolean 
    createdAt?:string 
    updatedAt?:string
  }

  type Account={
    id:string
    name:string 
    type:"CASH" | "BANK" | "CARD" | "WALLET" 
    balance:number
    createdAt?:string 
    updatedAt?:string
  }

  type Category={
    id:string
    name:string 
    color:string | null
    icon:string | null
    type:"INCOME" | "EXPENSE"
    createdAt?:string 
    updatedAt?:string

  }

  type Transaction={
    id:string
    title:string 
    amount:number 
    type:"INCOME" | "EXPENSE"
    note:string | null
    date:string
    account?:Account
    category?:Category
    accountId?:string 
    categoryId?:string
    createdAt?:string 
    updatedAt?:string

  }

  type Budget={
    id:string
    amount:number 
    month:number 
    year:number
    categoryId:string 
    category?:Category
    createdAt?:string 
    updatedAt?:string


  }
}

export {}