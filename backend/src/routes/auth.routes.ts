import { Router } from "express";
import {  logoutUser, AllLogout,userController,syncUserController} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyClerk } from "../middlewares/verify.middleware.js";

const authRouter=Router()


authRouter.route("/sync").post(verifyClerk,syncUserController)

authRouter.route("/user").get(verifyJWT,userController)

authRouter.route("/logout").post(logoutUser)

//logout-all devices
authRouter.route("/logoutAllDevice").post(verifyJWT,AllLogout)




export default authRouter