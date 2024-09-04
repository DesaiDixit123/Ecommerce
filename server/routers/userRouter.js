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
  getCartByUserId,
  updateCart,
  clearCart,
  removeProductFromCart,
} from "../controllers/userController.js";
// import { getAllCountries, getCitiesByState, getStatesByCountry } from "../controllers/OrderController.js";

export const userRouter = Router();


// userRouter.get("/countries", getAllCountries);
// userRouter.get("/states/:countryCode", getStatesByCountry);
// userRouter.get("/cities/:countryCode/:stateCode", getCitiesByState);
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
userRouter.get("/cart/:userId", getCartByUserId);
userRouter.put("/updateCart", updateCart);
userRouter.delete("/clearCart/:userId", clearCart);
userRouter.delete("/cart/:userId/product/:productId", removeProductFromCart);
