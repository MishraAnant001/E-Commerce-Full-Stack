import { Router } from "express";
import { UserController } from "../controllers";

const controller = new UserController()

export const userRouter = Router()
userRouter.route("/").get(controller.getAllUsers).post(controller.createUser)
userRouter.route("/:id").put(controller.updateUser).delete(controller.deleteUser).get(controller.getUserById)