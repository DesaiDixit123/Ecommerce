import { Router } from "express";
import { veriFicationUser } from "../controllers/userController.js";
import {
  uploadImages,
  usersProducts,
} from "../controllers/pendingProductController.js";

export const pendingProductRouter = Router();

pendingProductRouter.post(
  "/users/pending/products",
  veriFicationUser,
  uploadImages,
  usersProducts
);
