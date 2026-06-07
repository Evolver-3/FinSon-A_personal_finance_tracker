import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { updateProfile, uploadAvatar,getUserProfile } from "../controllers/user.controllers.js";

const userRouter=Router()

//user profile

userRouter.route("/profile").get(verifyJWT,getUserProfile)

userRouter.route("/profile-update").patch(verifyJWT,updateProfile)

userRouter.route("/avatar").patch(verifyJWT,upload.single("avatar"),uploadAvatar)


export default userRouter