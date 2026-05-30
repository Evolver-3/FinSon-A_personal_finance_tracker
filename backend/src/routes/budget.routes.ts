import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const budgetRouter=Router()

budgetRouter.use(verifyJWT)

export default budgetRouter