import { Router } from "express";
import { approveCategory, deleteCategoryUsers, getCategoryUsers, pendingCategory } from "../controllers/pendingCategoryController.js";
import { veriFicationUser } from "../controllers/userController.js";

export const pendingCategoryRouter=Router()

pendingCategoryRouter.post("/pendingCategory",veriFicationUser,pendingCategory)
pendingCategoryRouter.post("/pendingCategory/approval/:categoryId", approveCategory)
pendingCategoryRouter.get("/pendingCategoryUsers",veriFicationUser,getCategoryUsers)
pendingCategoryRouter.delete("/pendingCategoryUsers/:categoryId",veriFicationUser,deleteCategoryUsers)