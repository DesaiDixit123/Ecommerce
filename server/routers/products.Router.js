import { Router } from "express";
import { deleteProduct, getAllProducts, getProductsByCategory, products, updateProduct, uploadImages } from "../controllers/productsController.js";

export const productRouter = Router()

productRouter.get('/products/category/:category', getProductsByCategory);
productRouter.get('/products', getAllProducts);
productRouter.post("/products",uploadImages,products)
productRouter.route("/products/:id").delete(deleteProduct)
productRouter.route("/products/:id").put(updateProduct)