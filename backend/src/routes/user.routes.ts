import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { updateProfile, uploadAvatar } from "../controllers/user.controllers.js";

const userRouter=Router()

userRouter.route("/profile-update").patch(verifyJWT,updateProfile)

userRouter.route("/avatar").patch(verifyJWT,upload.single("avatar"),uploadAvatar)


export default userRouter