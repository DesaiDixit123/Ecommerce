import { Router } from "express";
import { adminLogin, adminVerification, verifyAdmin } from "../../controllers/admin/adminController.js";

export const adminRouter = Router()

adminRouter.route("/admin/login").post(adminLogin)
adminRouter.route("/admin").get(adminVerification, verifyAdmin)