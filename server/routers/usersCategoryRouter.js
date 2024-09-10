import { Router } from "express";
import {
  deleteCategory,
  deleteFieldFromCategory,
  getAllCategory,
  getFieldsForCategory,
  updateCategory,
  usersCategories,
} from "../controllers/usersCategoryController.js";
import { veriFicationUser } from "../controllers/userController.js";

export const usersCategoryRouter = Router();

usersCategoryRouter.route("/users/category").post(veriFicationUser
    , usersCategories);
usersCategoryRouter.route("/users/get/category").get(veriFicationUser,getAllCategory);
usersCategoryRouter
  .route("/users/get/category/fields/:categoryname")
  .get(veriFicationUser,getFieldsForCategory);
usersCategoryRouter.route("/users/category/:id").delete(veriFicationUser,deleteCategory);
usersCategoryRouter.route("/users/category/:id").put(veriFicationUser,updateCategory);
usersCategoryRouter
  .route("/users/category/deleteField/:id")
  .delete(veriFicationUser,deleteFieldFromCategory);
