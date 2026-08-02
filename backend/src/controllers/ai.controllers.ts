import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Groq from 'groq-sdk'
import { getPeriodLabel, getRange, type Period } from "../utils/selectedRange.js";
import { prisma } from "../prisma.js";
import ApiResponse from "../utils/ApiResponse.js";


const groq=new Groq({
  apiKey:process.env.GROQ_API_KEY
})

export const financeInsightsControllers=asyncHandler(async(req,res)=>{

  const userId=req.user?.id;

  if(!userId){
    throw new ApiError(401,"Authorization error")
  }

  console.log("Authorization successfull....")

  const period=(req.query.period as Period) || 'month'

  const {start,end}=getRange(period)

  const periodLabel=getPeriodLabel(period)



  const insightExist=await prisma.aiInsight.findFirst({
    where:{
      userId,
      period:period,
      dateStart:start.toDateString(),
      dateEnd:end.toDateString()
      
    }
  })

  console.log("backend insight does exist ??...", insightExist)

  if(insightExist){
    throw new ApiError(409,"insight already exist for that particular time period!!")
  }

  const transactions=await prisma.transaction.findMany({
    where:{
      userId,
      date:{
        gte:start,
        lte:end
      }
    },
    include:{
      category:true
    },
    orderBy:{date:'desc'}
  })

  if(!transactions){
    throw new ApiError(400,"failed to find the transactions details")
  }

  const now=new Date()

  const budgets=await prisma.budget.findMany({
    where:{
      userId,
      month:now.getMonth()+1,
      year:now.getFullYear()
    },
    include:{
      category:true
    }
  })

  if(!budgets){
    throw new ApiError(400,"failed to find the budget details")
  }

  const categoryTotals=transactions.reduce((acc,t)=>{
    const cateName=t.category?.name || 'Uncategorized';
    const amount=Number(t.amount)

    if(t.type==="EXPENSE"){
      acc[cateName]=(acc[cateName] || 0) +amount;
    }
    return acc;
  },{} as Record<string,number>)

  const totalIncome=transactions.filter(t=>t.type==="INCOME").reduce((sum,t)=>sum + Number(t.amount)
  ,0)

  const totalExpense=transactions.filter(t=>t.type==="EXPENSE").reduce((sum,t)=>sum + Number(t.amount),0)

  const savings=totalIncome-totalExpense

  const transactionsCount=transactions.length

  const topCategory=Object.entries(categoryTotals).sort((
    [,a],[,b])=>b-a)[0]


  const zodPrompt=`You are "Fin", a friendly financial advisor in the FinSon app.Analyze the user's ${periodLabel.toLowerCase()} finances and provide 2-3 concise insights.
Rules:
- Warm, conversational tone
- Reference the exact time period
- Compare to typical benchmarks if relevant
- Highlight top spending category
- Suggest one concrete action
- Under 150 words
- Don't emojis sparingly
- Don't use ** anywhere`;

  const userContext = `
  Time Period: ${periodLabel} (${start.toLocaleDateString()} - ${end.toLocaleDateString()})

  Summary:
  • Income: $${totalIncome.toFixed(2)}
  • Expenses: $${totalExpense.toFixed(2)}
  • Net Savings: $${savings.toFixed(2)}
  • Transactions: ${transactionsCount}

  Top Spending Category: ${topCategory ? `${topCategory[0]} ($${topCategory[1].toFixed(2)})` : 'None'}

  All Categories:
  ${Object.entries(categoryTotals)
  .sort(([, a], [, b]) => b - a)
  .map(([cat, amount]) => `• ${cat}: $${amount.toFixed(2)}`)
  .join('\n')}

  Budget Progress:
  ${budgets.map(b => {
    const spent = categoryTotals[b.category?.name] || 0;
    const limit = Number(b.amount);
    const pct = limit > 0 ? Math.round((spent / limit) * 100) : 0;
    return `• ${b.category?.name}: $${spent.toFixed(2)} / $${limit.toFixed(2)} (${pct}%)`;
  }).join('\n') || 'No budgets set'}`;

const modalSelection=await groq.chat.completions.create({
  model:"llama-3.1-8b-instant",
  messages:[
    {
      role:'system',
      content:zodPrompt
    },
    {
      role:'user',
      content:userContext
    }
  ],
  max_completion_tokens:500,
  temperature:0.7
})

const insights=modalSelection.choices[0]?.message.content

await prisma.aiInsight.create({
  data:{
    userId,
    content:insights!,
    period,
    summary:{
      income:totalIncome,
      expense:totalExpense,
      savings,
      transactionsCount,
      topCategory:topCategory?{name:topCategory[0], amount:topCategory[1]}:null
    },
    dateStart:start.toDateString(),
    dateEnd:end.toDateString()
  }
})

return res.status(200).json(new ApiResponse(200,
  {
    insights,
    period,
    periodLabel,
    dateRange:{start,end},
    summary:{
      income:totalIncome,
      expense:totalExpense,
      savings:savings,
      transactionsCount,
      topCategory:topCategory? {name:topCategory[0], amount:topCategory[1]}: null
    }
  },"Insights created"
))

})


export const getInsights=asyncHandler(async(req,res)=>{
   const userId=req.user?.id;

  if(!userId){
    throw new ApiError(401,"Authorization error")
  }

  console.log("Authorization successfull....")

  const period=(req.query.period as Period) || 'month'

  const {start,end}=getRange(period)

  const insightExist=await prisma.aiInsight.findFirst({
    where:{
      userId,
      period:period,
      dateStart:start.toDateString(),
      dateEnd:end.toDateString()
    }})

  if(!insightExist){
    throw new ApiError(401, "insight doesn't exist for this time period!!")
  }

  return res.status(200).json(new ApiResponse(
    200,insightExist,"Insight found"
  ))

})