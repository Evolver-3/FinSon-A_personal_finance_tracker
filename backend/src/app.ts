import express from 'express'
import cors from 'cors'

const app=express()

app.use(cors({
  origin:process.env.CORS,
  credentials:true
}))

app.use(express.json({
  limit:"16kb"
}))

//auth Routes
import authRouter from './routes/auth.routes.js'

app.use("/api/v1/auth",authRouter)

//user Routes
import userRouter from './routes/user.routes.js'

app.use("/api/v1/user",userRouter)

//account routes
import accountRouter from './routes/account.routes.js'

app.use("/api/v1/account",accountRouter)

//category routes
import categoryRouter from './routes/category.routes.js'

app.use("/api/v1/category",categoryRouter)

//transaction routes
import transactionRouter from './routes/transaction.routes.js'

app.use("/api/v1/transaction",transactionRouter)

//budget routes
import budgetRouter from './routes/budget.routes.js'

app.use("/api/v1/budget",budgetRouter)

app.use((err:any,req:any,res:any,next:any)=>{
  const statusCode=err.statusCode || 500
  const message=err.message || "Internal server error"

  res.status(statusCode).json({
    success:false,
    message
  })
})
export {app}