import { Router } from "express";
import { deleteProduct, getAllProducts, getProductsByCategory, products, updateProduct } from "../controllers/productsController.js";

export const productRouter = Router()

productRouter.get('/products/category/:category', getProductsByCategory);
productRouter.get('/products', getAllProducts);
productRouter.route("/products").post(products)
productRouter.route("/products/:id").delete(deleteProduct)
productRouter.route("/products/:id").put(updateProduct)