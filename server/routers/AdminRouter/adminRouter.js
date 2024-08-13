import { Router } from "express";
import { adminLogin, adminLogout, adminVerification, verifyAdmin } from "../../controllers/admin/adminController.js";

export const adminRouter = Router()

adminRouter.route("/admin/login").post(adminLogin)
adminRouter.route("/admin/logout").post(adminLogout)
adminRouter.route("/admin").get(adminVerification, verifyAdmin)