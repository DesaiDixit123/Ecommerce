import { Router } from "express";
import { categories, getAllCategory, getFieldsForCategory } from "../controllers/categoryController.js";

export const CategoryRouter = Router()

CategoryRouter.route("/admin/category").post(categories)
CategoryRouter.route("/admin/get/category").get(getAllCategory)
CategoryRouter.route("/admin/get/category/fields/:categoryname").get(getFieldsForCategory);