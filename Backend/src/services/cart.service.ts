import { ICart, ICartProduct } from "../interfaces";
import { Cart } from "../models";
import { ApiResponse, createSuccess, fetchSuccess, SuccessCodes, updateSuccess } from "../utils";

export class CartService{
    async getCart(id:string){
        const data = await Cart.findOne({userid:id}).select("products")
        return new ApiResponse(SuccessCodes.ok,data,fetchSuccess("cart"))
    }

    async updateCart(id:string,cartdata:ICartProduct[]){
        // console.log(cartdata)
        const cart= await Cart.findOne({userid:id})
        await Cart.findByIdAndUpdate(cart!._id,{
            products:cartdata
        })
        // await cart?.save()
        return new ApiResponse(SuccessCodes.ok,[],updateSuccess("cart"))
    }

    async AddProduct(id:string,productData:ICartProduct){
        const cart = await Cart.findOne({userid:id})
        // console.log(productData)
        cart?.products.push(productData)
        await cart?.save()
        return new ApiResponse(SuccessCodes.ok,[],createSuccess("product"))
    }
}