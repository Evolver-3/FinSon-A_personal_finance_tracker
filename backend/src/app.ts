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

import authRouter from './routes/user.routes.js'

app.use("/api/v1/auth",authRouter)

export {app}