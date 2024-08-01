import express, { json, urlencoded } from "express";
import dotenv from "dotenv"
import { db_con } from "./configs/db_con.js";
import { userRouter } from "./routers/userRouter.js";
import cors from "cors"
dotenv.config()
const app = express()



db_con(process.env.dbURL)
app.use(cors())
app.use(json())
app.use(urlencoded({ extends: true }))
app.use("/api", userRouter)

const PORT = process.env.port


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))