import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";

const orderSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        img: {
          type: String,
        },
        title: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    shippingAddress: {
      email: { type: String },
      fname: { type: String },
      lname: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      country: { type: String },
      zipCode: { type: Number },
      state: { type: String },
      city: { type: String },
      mobileNo: { type: Number },
    },
    paymentMethod: { type: String },

    orderNumber: { type: String },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      cancelledAt: { type: Date },
    },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
    cancelReason: { type: String,default:"" },
    cancelComment: { type: String ,default:""},
    deliverdAt: { type: Date },
  },
  { timestamps: true }
);

export const Order = model("order", orderSchema);
