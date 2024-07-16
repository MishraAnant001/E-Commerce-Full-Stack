import { Product,Category } from "../models";
import { ApiResponse, SuccessCodes } from "../utils";

export class DashboardService{
    async getAdminDashBoard(){
        const product = await Product.find({})
        const categories = await Category.find({})
        const data ={
            products:product.length,
            categories:categories.length,
        }
        return new ApiResponse(SuccessCodes.created,data,"Dashboard fetched successfully")
    }
}