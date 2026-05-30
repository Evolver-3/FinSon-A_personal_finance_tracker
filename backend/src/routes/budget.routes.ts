import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBudget, deleteBudgetById, getBudget, getBudgetById, updateBudgetById } from "../controllers/budget.controllers.js";

const budgetRouter=Router()

budgetRouter.use(verifyJWT)

budgetRouter.route("/").post(createBudget)

budgetRouter.route("/").get(getBudget)

budgetRouter.route("/:budgetId").get(getBudgetById)

budgetRouter.route("/:budgetId").patch(updateBudgetById)

budgetRouter.route("/budgetId").delete(deleteBudgetById )

export default budgetRouter