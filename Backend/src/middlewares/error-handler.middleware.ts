import { NextFunction, Request, Response } from "express";
import { ApiError, ErrorCodes } from "../utils";
export const errorHandler =(error:any,req:Request,res:Response,next:NextFunction)=>{
    if(error instanceof ApiError){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
    if(error.code ==11000){
        return res.status(ErrorCodes.badRequest).json({
            success:false,
            message:"User with email already exists!"
        })
    }
    console.log(error)
    return res.status(ErrorCodes.internalServerError).json({
        success:false,
        message:error.message
    })
}