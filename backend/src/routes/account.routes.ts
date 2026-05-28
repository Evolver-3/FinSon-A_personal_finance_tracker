import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createAccount, deleteAccount, getAccount, updateAccount } from "../controllers/accout.controllers.js";

const accountRouter=Router()

accountRouter.use(verifyJWT)

accountRouter.route('/').post(createAccount)

accountRouter.route("/").get(getAccount)

accountRouter.route('/:accountId').patch(updateAccount)

accountRouter.route("/:accountId").delete(deleteAccount)

export default accountRouter