import { IUser } from "../interfaces";
import { Cart, User } from "../models";
import { ApiError, ApiResponse, createSuccess, deleteSuccess, ErrorCodes, fetchSuccess, notFoundError, SuccessCodes, updateSuccess } from "../utils";
import bcrypt from "bcrypt"

export class UserService{
    async getAllUsers(){
        const data = await User.find({})
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound,notFoundError("user"))
        }
        return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("users"))
    }

    async getUserById(id:string){
        const data = await User.findById(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("user"))
        }
        return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("user"))
    }
    async deleteUser(id:string){
        const data = await User.findByIdAndDelete(id)

        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("user"))
        }
        await Cart.findOneAndDelete({userid:id})
        return new ApiResponse(SuccessCodes.ok,data,deleteSuccess("user"))
    }
    async updateUser(id:string,userdata:IUser){
        const data = await User.findByIdAndUpdate(id,userdata,{new:true})
        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("user"))
        }
        return new ApiResponse(SuccessCodes.ok,data,updateSuccess("user"))
    }
    async createUser(userdata:IUser){
        userdata.password = await bcrypt.hash(userdata.password,10)
        const data = await User.create(userdata)
        await Cart.create({
            userid:data._id
        })
        return new ApiResponse(SuccessCodes.created,data,createSuccess("user"))

    }
}