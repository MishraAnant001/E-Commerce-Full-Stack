import { Router } from "express";
import { userRouter } from "./user.route";
import { loginRouter } from "./login.route";
import { categoryRouter } from "./category.route";
import { productRouter } from "./product.route";
import { cartRouter } from "./cart.route";
import { dashboardRouter } from "./dashboard.route";

export const mainRouter = Router()

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/login",loginRouter)
mainRouter.use("/api/v1/category",categoryRouter)
mainRouter.use("/api/v1/product",productRouter)
mainRouter.use("/api/v1/cart",cartRouter)
mainRouter.use("/api/v1/dashboard",dashboardRouter)