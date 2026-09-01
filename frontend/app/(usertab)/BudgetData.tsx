import BudgetModel from "@/components/budget/BudgetModel"
import Animateddrop from "@/components/comps/Animate/Animateddrop"
import BudgetSpentBar from "@/components/comps/Animate/BudgetSpentBar"
import { FakeLoad } from "@/components/comps/Animate/FakeLoad"
import PressedAnimate from "@/components/comps/Animate/PressedAnimate"
import { formatAmount, formatDate } from "@/components/comps/DateFormat"
import { getIconByName } from "@/components/comps/Mode/ModalComp"
import Wrapper from "@/components/mainUi/WrapperPage"
import ThemeIcon from "@/components/Theme/ThemeIcon"
import { useBudget } from "@/hooks/useBudget"
import { useCategory } from "@/hooks/useCategory"
import { useTheme } from "@/hooks/useTheme"
import { useTransaction } from "@/hooks/useTransaction"
import { useAuth } from "@clerk/clerk-expo"
import { useFocusEffect } from "expo-router"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"


const BudgetData = () => {

  const {categoryId,month,year,budgetId,symbol}=useLocalSearchParams<{ 
    categoryId:string 
    month:string
    year:string
    budgetId:string
    symbol:any
  }>()

  const {isSignedIn}=useAuth()
  const isGuest=!isSignedIn

  const router=useRouter()

  const {editBudget,removeBudget,budgets,spendingBudget}=useBudget()
  const {transactions,loading}=useTransaction()
  const {categories}=useCategory()
  const [openEdit,setOpenEdit]=useState(false)

  const [deleteLoad,setDeleteLoad]=useState(false)
  const {isDark}=useTheme()

  const [pageError,setPageError]=useState<string | null>("")
  const [editLoad,setEditLoad]=useState(false)

  useFocusEffect(
    useCallback(()=>{
      const now=new Date()
      spendingBudget(now.getMonth()+1, now.getFullYear(),'')

      if(isGuest){
        spendingBudget(Number(month),Number(year),categoryId)
        }
    },[isGuest,month,year,categoryId])
  )

  const budgetTransactions=useMemo(()=>{
    return transactions.filter(t=>
      t.categoryId===categoryId &&
      t.type==="EXPENSE"
      )
    },[transactions,categoryId])

  const isInitiallyLoading=loading && budgetTransactions.length===0

  const budget=budgets.find(b=>b.id===budgetId)
  
  const spentAmount=Number(budget?.spent ?? 0 )

  const remainingAmount=Number(budget?.remaining ?? 0)

  const totalAmount=Number(budget?.amount?? 0)
  const perLeft=totalAmount>0 ?((remainingAmount/totalAmount) *100).toFixed(1): "0.0"

    const handleDeleteBudget=async()=>{

    setDeleteLoad(true)
    setPageError(null)
    try{
    await removeBudget(budgetId)
    router.back()

    }catch(err:any){
     const message="Failed to delete new Budget"
     setPageError(message)

    }finally{
      setDeleteLoad(false)
    }

  }

  return (
    <Wrapper loading={false}>

      <BudgetModel
      initialValues={{
        amount:budget?.amount,
        month:budget?.month,
        year:budget?.year,
        categoryId:budget?.categoryId
      }}
        error={pageError}
        setError={setPageError}
        loading={editLoad}
        categories={categories}
        submitText={"Update budget"}
        openModal={openEdit}
        setOpenModal={setOpenEdit}
        headerText='Update Budget'
        onSubmit={
        async(values)=>{
        setEditLoad(true)
        setPageError('')
          try{
              await editBudget(budgetId,
              {...values})
            }catch(err:any){
              const message= "Some error happen while updating edit Budget"
              setPageError(message)
            }finally{
              setEditLoad(false)
            }}}/>

      <FlatList
      data={isInitiallyLoading?[]:budgetTransactions}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{
        paddingHorizontal:4,
        paddingTop:6,
        gap:10
      }}
      ListHeaderComponent={
        <View className='flex-col gap-y-5 px-4 my-5'>

          <Text 
          className="text-md biggerText"
          style={{
                fontFamily:"Sans-Bold"
          }}>
            Check you budget details
          </Text>

          <View 
            className="boxBlock mainborder"
            style={{
              elevation:2
            }}>

            <View className="flex-col gap-y-6">
              <View className="flex-row justify-between items-end">

            <ThemeIcon icon={symbol} size={20}/>
            <Text className='text-md smallText'
            style={{
              fontFamily:"Sans-Semibold"
            }}>
              {formatAmount(spentAmount)} spent of </Text>
                <ThemeIcon icon={symbol} size={20}/>
            <Text>
              {formatAmount(totalAmount)}
            </Text>
            <Text className='text-xs text-green-600 dark:text-green-500'
              style={{
                    fontFamily:"Sans-Bold"
                }}>   
              {perLeft ?? 0}% remain</Text>
            </View>
        
            <View className="">
            <BudgetSpentBar
              spent={spentAmount}
              total={totalAmount}/>
            </View>

            <View className='flex-row gap-x-5 justify-end'>
              <PressedAnimate
              onPress={()=>setOpenEdit(true)}
              originalColor={isDark?"#518151":"#ADF7B3"}
              pressedColor={isDark?"#49B649":"#CEE9D0"}
              style={{
                width:40,
                height:20,
                borderRadius:5,
                alignItems:"center",
                justifyContent:"center",
                elevation:6}}>
            
              <Text
                className="smallText text-xs"
                style={{
                  fontFamily:"Sans-Semibold"
                }}>Edit</Text>
              </PressedAnimate>
            
              <PressedAnimate
              onPress={handleDeleteBudget}
              originalColor={isDark?"#753B2F":"#D28E89"}
              pressedColor={"#EAA59E"}
              style={{
                width:60,
                height:20,
                borderRadius:5,
                alignItems:'center',
                justifyContent:"center",
                elevation:6}}>

                {deleteLoad ?<ActivityIndicator color={"#ffffff"}/>:<Text className="smallText text-xs"
                style={{
                  fontFamily:"Sans-Semibold"
                }}>Remove</Text>}
              </PressedAnimate>
            </View> 
          </View>
            
        </View>

          <Text 
          className="text-md biggerText"
          style={{
                fontFamily:"Sans-Bold"
          }}>Check all transactions on your budget</Text>
        </View>
        }

      ListEmptyComponent={
        <FakeLoad
            loading={isInitiallyLoading}
            hasData={budgetTransactions.length>0}
                unmatchText='No matching transaction found'
                defaultText='No transactions exist'
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
                  <View key={item}
                  className='w-full h-20 rounded-md'
                  style={{
                    backgroundColor:isDark?"#857A83":"#E3C1DE"
                  }}>
                  </View> 
                ))}
        </FakeLoad>
        }

      showsVerticalScrollIndicator={false}

      renderItem={({item})=>(

        <View className='px-4'>
          <Animateddrop 
            viewstyle={{
              backgroundColor:isDark?"#212121":item.account?.color?.colors,
              elevation:2
          }}
          firstChild={
            <View className='gap-y-6'>
              <View className='flex-row items-center justify-between'>
                <View 
                className="flex-row items-center gap-x-6">
                <View  className='p-2 items-center rounded-lg '
                       style={{
                         elevation:5,
                         backgroundColor:item.category?.color?.darkColor
                       }}>
                    {getIconByName(item.account?.icon?? null,false,isDark?"#000000":"#ffffff",24)}
                </View>

                <View className=" gap-y-2">
                  <Text
                    className='smallText  uppercase text-md'
                    style={{
                      fontFamily:"Sans-Bold"
                    }}>
                      {item.title}
                  </Text>
                      
                  <Text
                    className='text-xs minText'
                    style={{
                      fontFamily:"Sans-ExtraBold"
                    }}>
                      {formatDate(String(item.date))}
                  </Text>
                </View>
              </View>

              {item.type==="EXPENSE" ? (
                <View>
                <Text
                className=" text-md biggerText  text-red-400 dark:text-red-400 "
                style={{
                  fontFamily:"Sans-Semibold"
                }}>
                  -{" "} </Text>
                  <ThemeIcon icon={symbol} size={20}/>
                  <Text>{formatAmount(item.amount)}
                </Text>
                </View>
                ):(
                <View>
                    <Text
                  className=" text-md biggerText  text-green-400 px-2 py-1 rounded-lg bg-green-100  dark:bg-gray-600"
                style={{
                  fontFamily:"Sans-Semibold"
                }}>
                  +{" "}
                  </Text>
                  <ThemeIcon icon={symbol} size={20}/>
                  <Text>{formatAmount(item.amount)}
                </Text>
                </View>
                
              )}
              </View>

              <View className="flex-row items-center gap-x-5 ">
                <Text className='biggerText text-md'
                style={{
                  fontFamily:"Sans-Semibold"
                }}>Note:</Text>

                <View className="flex-grow rounded-md p-2 px-4 bg-slate-100"
                style={{
                  backgroundColor:isDark?"#6F6562":"#ECF5F8",
                }}>
                <Text className="text-xs smallText"
                style={{
                  fontFamily:"Sans-Semibold"
                }}>
                  {item.note}
                </Text>
              </View>
              </View>
                  
            </View>
          }
          
          secChild={
            <View className=' gap-y-4'
            style={{
              paddingTop:14
            }}>
              
             <View className="flex-row items-center justify-between">
              <View className='flex-row items-end gap-x-3'>
                <Text className="biggerText text-md"
                style={{
                fontFamily:"Sans-Bold"
                }}
                >Account :</Text>

                <Text
                className='text-sm'
                style={{
                  color:isDark?item.account?.color?.btncolor:item.account?.color?.darkColor
                }}> {item.account?.name}</Text>
            
              </View>

              <View style={{
                borderRadius:4,
                paddingVertical:5,
                paddingHorizontal:6,
                elevation:2,
                backgroundColor:isDark?item.account?.color?.darkColor:item.account?.color?.btncolor
              }}>
                <Text className='text-xs oppText'
                style={{
                  fontFamily:"Sans-Bold"

                }}>{item.account?.type}</Text>
              </View>
             </View>


            </View>
          }/>
        </View>
      )}/>
    </Wrapper>
  )
}

export default BudgetData