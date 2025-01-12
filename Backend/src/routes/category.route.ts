import { Router } from "express";
import { CategoryController } from "../controllers";
import { Authentication } from "../middlewares/auth.middleware";

const controller = new CategoryController()
const auth = new Authentication()
export const categoryRouter = Router()
categoryRouter.route("/").get(controller.getAllCategories).post(auth.authenticateAdmin,controller.createCategory)
categoryRouter.route("/:id").put(auth.authenticateAdmin,controller.updateCategory).delete(auth.authenticateAdmin,controller.deleteCategory).get(controller.getCategoryById)