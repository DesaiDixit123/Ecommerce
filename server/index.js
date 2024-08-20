import express, { json, urlencoded } from "express";
import dotenv from "dotenv"
import { db_con } from "./configs/db_con.js";
import { userRouter } from "./routers/userRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { productRouter } from "./routers/products.Router.js";
import { adminRouter } from "./routers/AdminRouter/adminRouter.js";
import { CategoryRouter } from "./routers/CategoryRouter.js";
import bodyParser from 'body-parser';
dotenv.config()
const app = express()



db_con(process.env.dbURL)



app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use("/api", userRouter)
app.use("/api", productRouter)
app.use("/api", adminRouter)
app.use("/api", CategoryRouter)

const PORT = process.env.port


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))