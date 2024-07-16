import { ParsedQs } from "qs"
import { IProduct } from "../interfaces"
import { Product } from "../models"
import fs from "fs"
import { ApiError, ErrorCodes, notFoundError, ApiResponse, SuccessCodes, fetchSuccess, deleteSuccess, updateSuccess, createSuccess, dynamicSearchandFilter, dynamicSort } from "../utils"

export class ProductService {
    // async getAllProducts(filterObject:ParsedQs){
    //     console.log(filterObject);

    //     const data = await Product.aggregate([
    //         {
    //           $lookup: {
    //             from: "categories",
    //             localField: "category",
    //             foreignField: "_id",
    //             as: "category_result"
    //           }
    //         },
    //         {
    //           $project: {
    //             name:1,
    //             price:1,
    //             category:1,
    //             category_name: {$first:["$category_result.name"]}
    //           }
    //         }
    //       ])
    // if(data.length==0){
    //     throw new ApiError(ErrorCodes.notFound,notFoundError("product"))
    // }
    // return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("products"))
    // }

    async getAllProducts(filters: ParsedQs) {
        let { search, sort, minPrice, maxPrice, category } = filters
        const filterArray: any = [];
        if (category) {
            filterArray.push(
                {
                    "category_result.name": category
                }
            )
        }
        const data = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category_result"
                }
            },
            {
                $match: dynamicSearchandFilter(['name', 'category_result.name', 'description'], search as string, maxPrice as string, minPrice as string, filterArray)
            },
            {
                $sort: dynamicSort(sort as string)
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    category: 1,
                    category_name: { $first: ["$category_result.name"] },
                    file: 1,
                    description: 1
                }
            }
        ])
        if (data.length == 0) {
            throw new ApiError(ErrorCodes.notFound, notFoundError("product"))
        }
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("products"))
    }

    async getProductById(id: string) {
        const data = await Product.findById(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFoundError("product"))
        }
        return new ApiResponse(SuccessCodes.ok, data, fetchSuccess("product"))
    }
    async deleteProduct(id: string) {
        const data = await Product.findByIdAndDelete(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, notFoundError("product"))
        }
        const fileName = data.file
        fs.unlink(`${process.cwd()}/src/public/${fileName}`, (err) => {
            if (err) throw new ApiError(ErrorCodes.internalServerError, "Error while deleting file");
        })
        return new ApiResponse(SuccessCodes.ok, data, deleteSuccess("product"))
    }
    async updateProduct(id: string, userdata: IProduct): Promise<ApiResponse> {
        const product = await Product.findById(id)
        if (!product) {
            throw new ApiError(ErrorCodes.notFound, notFoundError("product"))
        }
        if (userdata.file) {
            const fileName = product.file
            fs.unlink(`${process.cwd()}/src/public/${fileName}`, (err) => {
                if (err) throw new ApiError(ErrorCodes.internalServerError, "Error while deleting file");
            })
        }
        const data = await Product.findByIdAndUpdate(id, userdata, { new: true })
        return new ApiResponse(SuccessCodes.ok, data, updateSuccess("product"))
    }
    async createProduct(userdata: IProduct) {
        const data = await Product.create(userdata)
        return new ApiResponse(SuccessCodes.created, data, createSuccess("product"))
    }
}