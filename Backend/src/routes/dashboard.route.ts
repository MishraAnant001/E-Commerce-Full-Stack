import { Router } from "express";
import { DashboardController } from "../controllers";
import { Authentication } from "../middlewares/auth.middleware"; 

export const dashboardRouter= Router()
const auth= new Authentication()
const controller = new DashboardController()
dashboardRouter.get("/admin",auth.authenticateAdmin,controller.getAdminDashboard)