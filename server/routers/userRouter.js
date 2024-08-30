import { Router } from "express";
import {
  getAllCountryWithPhoneCodes,
  upload,
  register,
  login,
  veriFicationUser,
  verifyUser,
  userLogout,
  forgetPassword,
  verifyOTP,
  resetPassword,
  updatePassword,
  getUser,
  deleteUser,
  addToWishlist,
  removeWishlist,
  addToCart,
} from "../controllers/userController.js";

export const userRouter = Router();

userRouter.route("/").get(veriFicationUser, verifyUser);
userRouter.route("/users").get(getUser);
userRouter.route("/countrieswithphonecodes").get(getAllCountryWithPhoneCodes);
userRouter.post("/register", upload.single("profileImg"), register);
userRouter.post("/login", login);
userRouter.post("/logout", userLogout);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/verifyOtp", verifyOTP);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/update-password", updatePassword);
userRouter.delete("/user/delete/:id", deleteUser);
userRouter.post("/AddToWishlist", veriFicationUser, addToWishlist);
userRouter.post("/RemoveWishlsit", veriFicationUser, removeWishlist);
userRouter.post("/addToCart", veriFicationUser, addToCart);
