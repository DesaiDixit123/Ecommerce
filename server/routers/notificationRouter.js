import { Router } from "express";
import { approvedProduct, deleteNotification, getNotifications } from "../controllers/adminNotificationController.js";
import { adminVerification } from "../controllers/Admin/adminController.js";

export const notificationRouter=Router()
notificationRouter.get("/adminNotification",adminVerification,getNotifications)
notificationRouter.post("/approved/:productId/:notificationId",approvedProduct)
notificationRouter.delete("/deleteNotification/:notificationId/:productId",deleteNotification)