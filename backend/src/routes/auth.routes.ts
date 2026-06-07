import { Router } from "express";
import { registerUser,loginUser,verifyEmail,resendVerificationEmail, changePassword, logoutUser, AllLogout, refreshAccessToken, forgotPassword, resetPassword} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter=Router()

//registering user
authRouter.route("/register").post(registerUser)

//user login
authRouter.route("/login").post(loginUser)

//verifying the email, whose link is send during registraition
authRouter.route("/verify-email").get(verifyEmail)

//resending the email verification code
authRouter.route("/resend-email").post(resendVerificationEmail)

//refreshAccessToken

authRouter.route("/refreshToken").post(refreshAccessToken)

//logout 
authRouter.route("/logout").post(logoutUser)

//logout-all devices
authRouter.route("/logoutAllDevice").post(verifyJWT,AllLogout)

//password change

authRouter.route("/password-reset").post(verifyJWT,changePassword)

//forgot password --to get the link on the user email

authRouter.route("/forgot-password").post(forgotPassword)

//verify the token and saves new password

authRouter.route("/reset-password").post(resetPassword)



export default authRouter