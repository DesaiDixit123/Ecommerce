import { Router } from "express";
import { veriFicationUser } from "../controllers/userController.js";
import {
  deleteProduct,
  filterProductsByRange,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getRelatedProducts,
  searchProducts,
  updateProduct,
  uploadImages,
  usersProducts,
} from "../controllers/usersProductsController.js";

export const userProductsRouter = Router();

userProductsRouter.get("/users/products/category/:category", getProductsByCategory);
userProductsRouter.get("/users/products", getAllProducts);

userProductsRouter.post(
  "/users/products",
  veriFicationUser,
  uploadImages,
  usersProducts
);

userProductsRouter.delete("/users/products/:id", deleteProduct);
userProductsRouter.put("/users/products/:id", uploadImages, updateProduct);

userProductsRouter.get(
  "/users/products/filterProductsByRange",
  filterProductsByRange
);
userProductsRouter.get("/users/products/search", searchProducts);
userProductsRouter.get("/users/products/:id", getProductById);
userProductsRouter.get("/users/related/:productId", getRelatedProducts);
