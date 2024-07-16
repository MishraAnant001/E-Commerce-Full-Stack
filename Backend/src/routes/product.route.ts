import { Router } from "express";
import { ProductController } from "../controllers";
import { Authentication } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/file-handler.middleware";

const controller = new ProductController()
const auth = new Authentication()
export const productRouter = Router()
productRouter.route("/?").get(controller.getAllProducts)
productRouter.route("/").post(auth.authenticateAdmin,upload.single("file"),controller.createProduct)
productRouter.route("/:id").put(auth.authenticateAdmin,upload.single("file"),controller.updateProduct).delete(auth.authenticateAdmin,controller.deleteProduct).get(controller.getProductById)