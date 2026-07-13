import React from "react"

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
    balance?:string
    icon?:string | null
    color?:CategoryColor
  }

  interface updateAccountProps{
    name?:string 
    type?:"CASH" | "BANK" | "CARD" | "WALLET" 
    balance?:string
    icon?:string | null
    color?:CategoryColor
  }

  interface createCategoryProps{
    name:string
    color?:CategoryColor
    icon?:string | null
    type:"INCOME" | "EXPENSE"
  }

  interface updateCategoryProps{
    name?:string
    color?:CategoryColor
    icon?:string | null
    type?:"INCOME" | "EXPENSE"
  }

  interface createTransactionProps{
    title:string 
    amount:string
    type:"INCOME" | "EXPENSE"
    note?:string 
    date?:Date
    accountId?:string
    categoryId?:string

  }

  type transactionCreatProps={
    openCreate:boolean 
    setOpenCreate:React.Dispatch<React.SetStateAction<boolean>>
    accounts:Account[]
    categories:Category[]
    pageLoad:boolean 
    setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
    setPageError:React.Dispatch<React.SetStateAction<string| null>>
    creatingNewTransaction:(values:createTransactionProps)=>Promise<void> 
    pageError:string | null
  }

  interface updateTransactionProps{
    title?:string 
    amount?:string
    type?:"INCOME" | "EXPENSE" 
    note?:string 
    date?:Date
    accountId?:string
    categoryId?:string
  }

  type TransactionContextType = {
  transactions: Transaction[]
  singleTransaction:Transaction | null
  loading: boolean
  error: string | null
  creatingNewTransaction: (data: createTransactionProps) => Promise<void>
  fetchAllTransactions:()=>Promise<void>
  fetchTransaction:(id:string)=>Promise<void>
  editTransaction:(id: string, data: updateTransactionProps) => Promise<void>
  removeTransaction: (id: string) => Promise<void>
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

type BudgetContextType = {
  budgets: Budget[]
  loading: boolean
  error: string | null
  spendingBudget: (month: number, year: number) => Promise<Budget[] | undefined>
  creatingNewBudget: (data: createBudgetProps) => Promise<void>
  editBudget: (id: string, data: updateBudgetProps) => Promise<void>
  removeBudget: (id: string) => Promise<void>
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
    color:{
      btncolor:string 
      colors:string 
      darkColor:string
    }
    icon:string
    balance:string
    createdAt?:string 
    updatedAt?:string
  }

  type Category={
    id:string
    name:string 
    color:{
      btncolor:string 
      colors:string 
      darkColor:string
    }
    icon:string | null
    type:"INCOME" | "EXPENSE"
    createdAt?:string 
    updatedAt?:string

  }

  type Transaction={
    id:string
    title:string 
    amount:string 
    type:"INCOME" | "EXPENSE"
    note:string 
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
    spent?:Number 
    remaining?:Number


  }

  type AuthContextType={
    user:User|null
    loading:boolean 
    setUser:React.Dispatch<React.SetStateAction<User|null>>
    loadUser:()=>Promise<void>
  }

  //type of icon state
  type IconFn=(focused:boolean,color?:string,size?:number)=>React.JSX.Element


  
type CategoryColor = {
  btncolor: string
  colors: string
  darkColor: string
}

type TabIconProps={
  focused:boolean 
  icon: React.ReactNode
  text:string
}

type AccountItemProps={
  item:Account 
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  removeAccount:(id:string)=>Promise<void>
  selectedAccount:Account | null
}

type createAccountsProps={
  creatingAccount:(values:createAccountProps)=>Promise<void>
  pageError:string
  setPageError:React.Dispatch<React.SetStateAction<string>>
  pageLoad:boolean
  setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
  openModal:boolean
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

type UpdateAccountProps={
  openEdit:boolean 
  setOpenEdit:React.Dispatch<React.SetStateAction<boolean>>
  account:Account | null
  editAccount:(id:string,data:updateAccountProps)=>Promise<void>
  loading:boolean
  error:string | null
}

type onSubmitBudget={
  amount:number
  month:number 
  year:number 
  categoryId:string
}

type budgetModalProps={
  initialValues?:Partial<createBudgetProps>
  error:string | null
  loading:boolean
  categories:Category[]
  onSubmit:(values:onSubmitBudget)=>Promise<void>
  submitText:string
  openModal:boolean 
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  viewFlex:number 
  pressableFlex:number
}


type budgetValues={
  amount:number
  month:number
  year:number
  categoryId:string
}
type createBudgetPageProps={
  creatingNewBudget:(values:budgetValues)=>Promise<void>
  loading:boolean
  categories:Category[]
  pageLoad:boolean 
  setPageLoad:React.Dispatch<React.SetStateAction<boolean>>
  setPageError:React.Dispatch<React.SetStateAction<string>>
  pageError:string
  openModal:boolean
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  viewFlex:number 
  pressableFlex:number
}

type createCateProps={
  visible:boolean 
  setVisible:React.Dispatch<React.SetStateAction<boolean>>
  name:string 
  setName:React.Dispatch<React.SetStateAction<string>>
  type:string
  setType:React.Dispatch<React.SetStateAction<"INCOME"|"EXPENSE">>
  color:CategoryColor
  setColor:React.Dispatch<React.SetStateAction<CategoryColor>>
  handleSubmit:()=>void
  loading:boolean
  icon:string|null
  setIcon:React.Dispatch<React.SetStateAction<string| null>>
}

type RenderCategoryProps={
  item:Category
  loading:boolean
  selectedCategory:Category |null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>
  fetchCategory:(id:string)=>Promise<Category>
  removeCategory:(id:string)=>Promise<void>
  
}

type updateProps={
  openEdit:boolean
  setOpenEdit:React.Dispatch<React.SetStateAction<boolean>>
  selectedCategory:Category  | null
  editCategory:(id:string,data:updateCategoryProps)=>Promise<void>
  loading:boolean
}


type animatedDropProps={
  style?:StyleProp<ViewStyle>
  secStyle?:StyleProp<ViewStyle>
  firstChild:React.ReactNode
  secChild:React.ReactNode
  viewstyle?:StyleProp<ViewStyle>
}

type budgetSpentBarProps={
  spent:number 
  total:number 
  color?: string
}

type pressedAnimateProps={
  onPress:()=>void
  children:React.ReactNode,
  pressedColor:string
  originalColor:string
  style:ViewStyle
  className?:string
}

type HeaderListProps={
  headingText:string 
  onPress:()=>void
  inlineText:string
  setQuery:React.Dispatch<React.SetStateAction<string>>
}

type ModalCompProps={
  visible?:boolean 
  onRequestClose:()=>void 
  textblock:string 
  children:React.ReactNode
  pressableFlex?:number 
  viewFlex?:number
}

type SelectTypeProps={
  text:string 
  onPress:()=>void
  focused:boolean
}


type SelectColorProps={
  onPress:()=>void
  focused:boolean
  style:ViewStyle  

}


type TabIconsProps={
  icon: string | null
  onPress:()=>void
  focused:boolean
  name:string
  style:ViewStyle
}

type authBodyProps={
  children: ReactNode
  errorMessage:string | null
  headingText:string 
}

type buttonNeedProps={
  onPress:()=>void
  text:string
  disabled:boolean
  loading:boolean
  style:StyleProp<ViewStyle>
}

type ErrorPopUpProps={
  errorMessage:string | null
}


type optionBtnProps={
  onPress:()=>void
  btnText:string
  loading?:boolean
  disabled?:boolean
}

type DropdownOptions={
  id:string 
  name:string
  color?:CategoryColor
}

type DropdownProps={
  options:DropdownOptions[]
  selectedId:string 
  onSelect:(id:string)=>void
  placeholder?:string
}

type dataProps={
  tag:string
  placeholder:string 
  value:string 
  onChangeText:(text:string)=>void
  secureTextEntry:boolean
  tagexist:boolean
  keyboardType:KeyboardTypeOptions
  errorType?:boolean
  multiline?:boolean
  lines?:number 
  textAlignVertical?:"center" | "auto" | "top" | "bottom"
  
}


type headingTextProps={
  headingText?:string 
  children?:React.ReactNode
}

type tabRowType={
  icon:React.ReactNode 
  tabName:string
  href:Href
}

type SearchBarProps={
  inlineText:string
  onSearch:(query:string)=>void
}

type ThemeIconProps={
  icon:LucideIcon
  size:number
  darkColor?:string
  lightColor?:string
}


type renderTransactionProps={
  item:Transaction 
  editTransaction:(id:string, data:updateTransactionProps)=>Promise<void>
  removeTransaction:(id:string)=>Promise<void>
  accounts:Account[]
   categories:Category[]
   fetchTransaction:(id:string)=>Promise<void>
}


type initialValuesTransactionProps={
  id?:string
  title?:string 
  amount?:string 
  type?:"INCOME"|"EXPENSE" 
  note?:string 
  date?:Date
  accountId?:string 
  categoryId?:string
}

type TransactionCompProps={
  initialValues?:Partial<initialValuesTransactionProps>
  accounts:Account[]
  categories:Category[]
  type?:"INCOME"|"EXPENSE"
  onSubmit:(values:createTransactionProps)=>Promise<void>
  submitText:string 
  loading:boolean
  openCreate:boolean
  setOpenCreate:React.Dispatch<React.SetStateAction<boolean>>
  pressableFlex:number 
  viewFlex:number
  error:string | null
  textBlock:string
}


type TransactionFormProps={
  initialValues?:Partial<initialValuesTransactionProps>
    accounts:Account[]
    categories:Category[]
    onSubmit:(values:createTransactionProps)=>Promise<void>
    submitText:string 
    loading:boolean
    error:string | null
}


type authBodyProps={
  children: ReactNode
  errorMessage:string | null
  headingText:string
}

type wrapperProps={
  children:ReactNode
  loading:boolean
}

type CurrencyContextType={
  countryName:string;
  setCountryName:(country:string)=>void;
  symbol:string;
  currencyCode:string;
}

type InitialAccountValueProps={
  name?:string 
  balance?:string 
  type?:"CASH" | "BANK" | "CARD" | "WALLET"
  color?:string 
  icon?:string
}

type AccountDataProps={
  initialValues?:Partial<>
  error:string | null
  loading:boolean
  onSubmit:(values:createAccountProps)=>Promise<void>
  submitText:string
  openModal:boolean
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  viewFlex:number
  pressableFlex:number
}

}

export {}