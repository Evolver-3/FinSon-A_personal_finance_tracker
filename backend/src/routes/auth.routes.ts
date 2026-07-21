import { Router } from "express";
import {  logoutUser, AllLogout, refreshAccessToken,googleLogin,googleLoginWithCode} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter=Router()

//auth with google

authRouter.route("/google").post(googleLogin)
authRouter.route("/google/code").post(googleLoginWithCode);




authRouter.route("/refreshToken").post(refreshAccessToken)

//logout 
authRouter.route("/logout").post(logoutUser)

//logout-all devices
authRouter.route("/logoutAllDevice").post(verifyJWT,AllLogout)




export default authRouter