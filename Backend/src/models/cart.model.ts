import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        rewuired: true
    },
    products: {
        type: [
            {
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

export const Cart = mongoose.model("Cart", cartSchema)