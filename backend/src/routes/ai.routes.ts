import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {financeInsightsControllers,getInsights} from '../controllers/ai.controllers.js'

const aiRouter=Router()

aiRouter.use(verifyJWT)

aiRouter.route("/insights").post(financeInsightsControllers)

aiRouter.route('/insights/period').get(getInsights)

export default aiRouter