import { Router } from "express";
import {
    deleteProduct,
    filterProductsByRange,
    getAllProducts,
    getProductsByCategory,
    products,
  
    searchProducts,
  
    updateProduct,
    uploadImages,
} from "../controllers/productsController.js";

export const productRouter = Router();

productRouter.get('/products/category/:category', getProductsByCategory);
productRouter.get('/products', getAllProducts);
productRouter.post("/products", uploadImages, products);
productRouter.delete("/products/:id", deleteProduct);
productRouter.put("/products/:id", uploadImages, updateProduct);


productRouter.get("/products/filterProductsByRange", filterProductsByRange);
productRouter.get("/products/search", searchProducts);