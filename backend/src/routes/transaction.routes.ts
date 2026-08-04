import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTransaction, deleteTransactionById, getTransactionById, updateById, getTransactionByYear} from "../controllers/transaction.controllers.js";

const transactionRouter=Router()

transactionRouter.use(verifyJWT)

//creating a new transaction
transactionRouter.route("/").post(createTransaction)

//getBy year

transactionRouter.route("/queryYear").get(getTransactionByYear)



//getting transaction by id
transactionRouter.route("/:transactionId").get(getTransactionById)

//update by id
transactionRouter.route("/:transactionId").patch(updateById)

//delete by id
transactionRouter.route("/:transactionId").delete(deleteTransactionById)

export default transactionRouter