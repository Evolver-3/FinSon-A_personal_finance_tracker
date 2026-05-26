import dotenv from 'dotenv'

dotenv.config()

const requiredEnv=[
  "DATABASE_URL",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_CLOUD_NAME"
]

for (const key of requiredEnv){
  if(!process.env[key]){
    throw new Error(`Missing environment variable: ${key}`)
  }
}

const env={
  PORT:process.env.PORT,
  DATABASE_URL:process.env.DATABASE_URL!,
  DIRECT_URL:process.env.DIRECT_URL!,

  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET!,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME!,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET!,
  MAIL_USER:process.env.MAIL_USER,
  MAIL_PASS:process.env.MAIL_PASS,
  CLIENT_URL:process.env.CLIENT_URL

}

export default env