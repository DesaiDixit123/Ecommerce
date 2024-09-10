import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: String,
  products: {
    productId: { type: String },
    category: { type: String },
    fields: [{ type: String }], 
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    img5: { type: String },
    title: { type: String },
    price: { type: Number },
    discount: { type: Number },
    discription: { type: String },
  },

  title: String,
  message: String,
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
export const Notification = mongoose.model("Notification", notificationSchema);
