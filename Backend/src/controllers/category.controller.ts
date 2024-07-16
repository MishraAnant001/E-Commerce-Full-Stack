import { NextFunction, Request, Response } from "express"
import { ICategory } from "../interfaces"
import { CategoryService } from "../services"

const service = new CategoryService()
export class CategoryController{
    async getAllCategories(req:Request,res:Response,next:NextFunction){
        try {
            const response = await service.getAllCategories()
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const response = await service.getCategoryById(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async deleteCategory(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const response = await service.deleteCategory(id)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async updateCategory(req:Request,res:Response,next:NextFunction){
        try {
            const {id} =req.params
            const userdata:ICategory = req.body
            const response = await service.updateCategory(id,userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
    async createCategory(req:Request,res:Response,next:NextFunction){
        try {
            const userdata:ICategory = req.body
            const response = await service.createCategory(userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}