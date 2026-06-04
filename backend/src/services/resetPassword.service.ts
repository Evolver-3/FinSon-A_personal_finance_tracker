import env from '../constant/env.js'
import {transporter} from '../constant/mail.js'
export const passwordResetEmail=async(email:string,token:string)=>{
  const resetLink=`${env.CLIENT_URL}/auth/reset-password?token=${token}`

  await transporter.sendMail({
    from:`"FinSet" <${env.MAIL_USER}>`,
    to:email,
    subject:"Reset Password Link",
    html:`<h2>Reset your password</h2>
          <p>Click on the link below to reset your password and create a new one:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>This link will expire in 15 minutes.</p>`
  })
}