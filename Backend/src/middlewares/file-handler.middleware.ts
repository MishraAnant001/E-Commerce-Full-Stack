import { Request } from "express"
import multer from "multer"
import { newRequest } from "../interfaces"


const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb) {
        cb(null, '../backend/src/public')
    },
    filename: function (req:newRequest, file, cb) {
        // console.log("original name",file.originalname);
        const fileName=Date.now()+".jpeg"
        cb(null, fileName)
    }
})
export const upload = multer({ storage: storage })