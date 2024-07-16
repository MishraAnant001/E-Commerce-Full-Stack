import express from "express"
import config from "config"
import cookieParser from "cookie-parser"
import { connectDB } from "./src/db/connect"
import { mainRouter } from "./src/routes"
import { errorHandler } from "./src/middlewares/error-handler.middleware"
import cors from "cors"
const app = express()
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static('./src/public'))
app.use(mainRouter);
app.use(errorHandler)
;
(async function start() {
    try {
        const port: number = config.get("PORT")
        const url: string = config.get("MONGOURI")
        await connectDB(url)
        console.log("Database connected!")
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error: any) {
        console.log(`Error while starting server : ${error.message}`)
    }
})();


