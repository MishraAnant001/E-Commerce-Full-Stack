import { NextFunction, Response } from "express";
import { ApiError, ErrorCodes } from "../utils";
import config from "config"
import jwt from "jsonwebtoken"
import { newRequest } from "../interfaces";

export class Authentication{
    authenticateAdmin(req:newRequest,res:Response,next:NextFunction){
        try {
            const token =req.headers.authorization?.split(" ")[1]
            // console.log(token)
            if(!token){
                throw new ApiError(ErrorCodes.unauthorized,"Unauthorized access!")
            }
            const secretKey:string = config.get("SECRETKEY")
            jwt.verify(token as string,secretKey,(err,decoded)=>{
                if(err){
                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"token expired kindly login again!"
                    })
                }
                req.userid= (decoded as {id:string}).id
                req.role= (decoded as {role:string}).role
                if(req.role!=="admin"){
                    return res.status(ErrorCodes.unauthorized).json({
                        success:false,
                        message:"Unauthorized access! only admins are allowed"
                    })
                }
                next()
            })

        } catch (error) {
           next(error)
        }
    }
    authenticateUser(req:newRequest,res:Response,next:NextFunction){
        try {
            const token =req.headers.authorization?.split(" ")[1]
            // console.log(token)
            if(!token){
                throw new ApiError(ErrorCodes.unauthorized,"Unauthorized access!")
            }
            const secretKey:string = config.get("SECRETKEY")
            jwt.verify(token as string,secretKey,(err,decoded)=>{
                if(err){
                    res.status(ErrorCodes.badRequest).json({
                        success:false,
                        message:"token expired kindly login again!"
                    })
                }
                req.userid= (decoded as {id:string}).id
                req.role= (decoded as {role:string}).role
                if(req.role!=="user"){
                    res.status(ErrorCodes.badRequest).json({
                        success:false,
                        message:"Unauthorized access! please login first"
                    })
                }
                next()
            })

        } catch (error) {
           next(error)
        }
    }
}