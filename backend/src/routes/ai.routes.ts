import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {financeInsightsControllers} from '../controllers/ai.controllers.js'

const aiRouter=Router()

aiRouter.use(verifyJWT)

aiRouter.route("/insights").post(financeInsightsControllers)

export default aiRouter