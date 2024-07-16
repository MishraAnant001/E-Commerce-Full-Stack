import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services";
const service = new LoginService()

export class LoginController{
    async loginUser(req:Request,res:Response,next:NextFunction){
        try {
            const{email,password}=req.body
            const response = await service.loginUser(email,password)
            // res.cookie("token", response.data.token)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}