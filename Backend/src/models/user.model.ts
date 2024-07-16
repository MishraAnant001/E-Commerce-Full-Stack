import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["user","admin"],
            message:"{VALUE} is not a valid role"
        },
        default:"user"
    }
})

export const User = mongoose.model("User",userSchema)