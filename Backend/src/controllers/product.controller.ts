import { NextFunction,Request,Response } from "express"
import { IProduct } from "../interfaces"
import { ProductService } from "../services"

const service= new ProductService()
export class ProductController{
    async getAllProducts(req:Request,res:Response,next:NextFunction){
        try {
            const filterObject = req.query
            // console.log(filterObject);
            const response = await service.getAllProducts(filterObject)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getProductById(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const response = await service.getProductById(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async deleteProduct(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const response = await service.deleteProduct(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async updateProduct(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const userdata:IProduct = req.body
            if(req.file){
                userdata.file = req.file!.filename
            }
            // console.log(userdata);
            const response = await service.updateProduct(id,userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async createProduct(req:Request,res:Response,next:NextFunction){
        try {
            const userdata:IProduct = req.body
            userdata.file = req.file!.filename
            // console.log(userdata);
            const response = await service.createProduct(userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}