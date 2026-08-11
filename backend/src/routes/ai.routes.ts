import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {financeInsightsControllers,getInsights,getInsightSchedule,insightsByPeriod} from '../controllers/ai.controllers.js'

const aiRouter=Router()

aiRouter.use(verifyJWT)

aiRouter.route("/insights").post(financeInsightsControllers)

aiRouter.route('/insights/period').get(getInsights)

aiRouter.route("/insights/by-period").get(insightsByPeriod)

aiRouter.route("/insightSchedule").post(getInsightSchedule)

export default aiRouter