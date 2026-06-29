import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBudget, deleteBudgetById, updateBudgetById, getBudgetValues
 } from "../controllers/budget.controllers.js";

const budgetRouter=Router()

budgetRouter.use(verifyJWT)

budgetRouter.route("/").post(createBudget)


budgetRouter.route("/:budgetId").patch(updateBudgetById)

budgetRouter.route("/budgetId").delete(deleteBudgetById )

budgetRouter.route('/').get(getBudgetValues)

export default budgetRouter