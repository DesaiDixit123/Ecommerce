import { model, Schema } from "mongoose";
const userSchema = Schema({
  profileImg: { type: String },
  fname: { type: String },
  lname: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  Pincode: { type: String },
  phonecode: { type: String },
  contactno: { type: String },
  token: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  resetPasswordOTP: { type: String }, // OTP for password reset
  resetPasswordExpires: { type: Date },
  cart: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const User = model("user", userSchema);
