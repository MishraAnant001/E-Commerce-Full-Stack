import { NextFunction, Request, Response } from "express";
import { CartService } from "../services";
import { ICart, ICartProduct, newRequest } from "../interfaces";
const service = new CartService()
export class CartController {
    async getCart(req: newRequest, res: Response, next: NextFunction) {
        try {

            const userid=req.userid
            console.log(userid)
            const response = await service.getCart(userid!)
            res.status(response.statusCode).json(response)

        } catch (error) {
            next(error)
        }
        
    }

    async updateCart(req: newRequest, res: Response, next: NextFunction) {
        try {
            const userdata:ICartProduct[] = req.body
            const userid=req.userid
            const response = await service.updateCart(userid!,userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    async AddProduct(req: newRequest, res: Response, next: NextFunction){
        try {
            const userdata:ICartProduct = req.body
            const userid=req.userid
            const response = await service.AddProduct(userid!,userdata)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}