import env from './constant/env.js'
import { app } from "./app.js";
import { connectDB } from './prisma.js';


connectDB().then(()=>{
  app.listen(env.PORT || 5000, ()=>{
    console.log(`Server running on PORT ${process.env.PORT}`)
  })
}).catch((error:any)=>{
  console.log("Failed to connect to Database",error)
})

