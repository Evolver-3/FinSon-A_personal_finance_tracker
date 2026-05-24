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

export {app}