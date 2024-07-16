import { ICategory } from "../interfaces";
import { Category } from "../models";
import { ApiError, ErrorCodes, notFoundError, ApiResponse, SuccessCodes, fetchSuccess, deleteSuccess, updateSuccess, createSuccess } from "../utils";

export class CategoryService{
    async getAllCategories(){
        const data = await Category.find({}).select("_id name")
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound,notFoundError("category"))
        }
        return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("categories"))
    }

    async getCategoryById(id:string){
        const data = await Category.findById(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("category"))
        }
        return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("category"))
    }
    async deleteCategory(id:string){
        const data = await Category.findByIdAndDelete(id)
        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("category"))
        }
        return new ApiResponse(SuccessCodes.ok,data,deleteSuccess("category"))
    }
    async updateCategory(id:string,userdata:ICategory){
        const data = await Category.findByIdAndUpdate(id,userdata,{new:true})
        if(!data){
            throw new ApiError(ErrorCodes.notFound,notFoundError("category"))
        }
        return new ApiResponse(SuccessCodes.ok,data,updateSuccess("category"))
    }
    async createCategory(userdata:ICategory){
        const data = await Category.create(userdata)
        return new ApiResponse(SuccessCodes.created,data,createSuccess("category"))
    }
}