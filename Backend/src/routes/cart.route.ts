import { Router } from "express";
import { CartController } from "../controllers";
import { Authentication } from "../middlewares/auth.middleware";

const controller = new CartController()
const auth = new Authentication()
export const cartRouter = Router()
cartRouter.use(auth.authenticateUser)
cartRouter.route("/").get(controller.getCart).put(controller.updateCart).post(controller.AddProduct)