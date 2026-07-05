import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBudget, deleteBudgetById, updateBudgetById, getBudgetValues
 } from "../controllers/budget.controllers.js";

const budgetRouter=Router()

budgetRouter.use(verifyJWT)

budgetRouter.route("/").post(createBudget).get(getBudgetValues)


budgetRouter.route("/:budgetId").patch(updateBudgetById).delete(deleteBudgetById)


export default budgetRouter