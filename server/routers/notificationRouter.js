import { Router } from "express";
import { approvedProduct, deleteNotification, getNotifications } from "../controllers/adminNotificationController.js";
import { adminVerification } from "../controllers/admin/adminController.js";

export const notificationRouter=Router()
notificationRouter.get("/adminNotification",adminVerification,getNotifications)
notificationRouter.post("/approved/:productId/:notificationId",approvedProduct)
notificationRouter.delete("/deleteNotification/:notificationId",deleteNotification)