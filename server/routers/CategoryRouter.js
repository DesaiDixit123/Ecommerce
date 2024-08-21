import { Router } from "express";
import { categories, deleteCategory, deleteFieldFromCategory, getAllCategory, getFieldsForCategory, updateCategory } from "../controllers/categoryController.js";

export const CategoryRouter = Router()

CategoryRouter.route("/admin/category").post(categories)
CategoryRouter.route("/admin/get/category").get(getAllCategory)
CategoryRouter.route("/admin/get/category/fields/:categoryname").get(getFieldsForCategory);
CategoryRouter.route("/admin/category/:id").delete(deleteCategory);
CategoryRouter.route("/admin/category/:id").put(updateCategory);
CategoryRouter.route("/admin/category/deleteField/:id").delete(deleteFieldFromCategory);