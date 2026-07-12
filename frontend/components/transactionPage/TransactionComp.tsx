
import ModalComp from '../comps/Mode/ModalComp'
import TransactionForm from './TransactionForm'


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

const TransactionComp = ({initialValues,accounts,categories,onSubmit,submitText,loading,openCreate,setOpenCreate,pressableFlex,viewFlex,error,textBlock}:TransactionCompProps) => {


  return (

      <ModalComp
        
         visible={openCreate}
        onRequestClose={()=>setOpenCreate(false)}
        textblock={textBlock}
        pressableFlex={pressableFlex}
        viewFlex={viewFlex}>

          <TransactionForm
          initialValues={initialValues}
          accounts={accounts}
          categories={categories}
          onSubmit={onSubmit}
          submitText={submitText}
          loading={loading}
          error={error}
          />

      </ModalComp>

 
  )
}

export default TransactionComp