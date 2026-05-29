import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCategory, deleteById, getAllCategory, getCategoryById, updateCategoryById } from "../controllers/category.controllers.js";

const categoryRouter=Router()

categoryRouter.use(verifyJWT)

//create category router
categoryRouter.route("/").post(createCategory)

//getting categories route
categoryRouter.route("/").get(getAllCategory)

//getting category by id
categoryRouter.route("/:categoryId").get(getCategoryById)

//update category by id
categoryRouter.route("/:categoryId").patch(updateCategoryById)

//delete category by id
categoryRouter.route("/:categoryId").delete(deleteById)

export default categoryRouter