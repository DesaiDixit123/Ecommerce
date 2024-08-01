import { Router } from "express"
import { getAllCountryWithPhoneCodes, upload, register } from "../controllers/userController.js"
export const userRouter = Router()

userRouter.route("/countrieswithphonecodes").get(getAllCountryWithPhoneCodes)
userRouter.post("/register", upload.single("profileImg"), register);