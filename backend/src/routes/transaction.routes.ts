import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTransaction, deleteTransactionById, getAllTransaction, getTransactionById, updateById ,getTransactionByMonthYear} from "../controllers/transaction.controllers.js";

const transactionRouter=Router()

transactionRouter.use(verifyJWT)

//creating a new transaction
transactionRouter.route("/").post(createTransaction)

//getting transaction
transactionRouter.route("/").get(getAllTransaction)

//get by month/year

transactionRouter.route("/period").get(getTransactionByMonthYear)

//getting transaction by id
transactionRouter.route("/:transactionId").get(getTransactionById)

//update by id
transactionRouter.route("/:transactionId").patch(updateById)

//delete by id
transactionRouter.route("/:transactionId").delete(deleteTransactionById)

export default transactionRouter