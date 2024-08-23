import { Router } from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductsByCategory,
    products,
    updateProduct,
    uploadImages,
} from "../controllers/productsController.js";

export const productRouter = Router();

productRouter.get('/products/category/:category', getProductsByCategory);
productRouter.get('/products', getAllProducts);
productRouter.post("/products", uploadImages, products);
productRouter.delete("/products/:id", deleteProduct);
productRouter.put("/products/:id", uploadImages, updateProduct);
