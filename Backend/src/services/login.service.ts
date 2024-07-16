import { User } from "../models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "config"
import { ApiError, ApiResponse, ErrorCodes, notFoundError, SuccessCodes } from "../utils";

export class LoginService{
    async loginUser(email:string,password:string){
        const user = await User.findOne({email:email})
        if(!user){
            throw new ApiError(ErrorCodes.notFound,notFoundError("user"))
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            throw new ApiError(ErrorCodes.badRequest,"Invalid password!")
        }
        const secretKey:string = config.get("SECRETKEY")
        const token = jwt.sign({
            id:user._id,
            role:user.role
        },secretKey,{
            expiresIn:"24h"
        })
        return new ApiResponse(SuccessCodes.ok,{token:token,user:user},"Login successful!")
    }
}