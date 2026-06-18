import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createAccount, deleteAccount, getAllAccount,getAccountById, updateAccount } from "../controllers/account.controllers.js";

const accountRouter=Router()

accountRouter.use(verifyJWT)

accountRouter.route('/').post(createAccount)

accountRouter.route("/").get(getAllAccount)

accountRouter.route("/:accountId").get(getAccountById)

accountRouter.route('/:accountId').patch(updateAccount)

accountRouter.route("/:accountId").delete(deleteAccount)

export default accountRouter