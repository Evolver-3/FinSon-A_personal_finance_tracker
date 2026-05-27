import { transporter } from "../constant/mail.js";
import env from '../constant/env.js'

export const verificationEmailService=async(email:string,token:string)=>{

  const verificationLink=`${env.CLIENT_URL}/verify-email?token=${token}`

  await transporter.sendMail({
    from :`"FinSer" <${env.MAIL_USER}>`,
    to:email,
    subject:"Verify your email",
    html:`<h2>Verify your email</h2>
          <p>Click on the link below to verify your email account:</p>
          <a href="${verificationLink}">Verify email</a>
          <p>This link will expire in 15 minutes.</p>`
  })
}