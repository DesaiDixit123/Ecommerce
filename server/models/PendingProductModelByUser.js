import mongoose from "mongoose";

// Define the Pending Product Schema
const pendingProductSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
  img1: {
    type: String,
    required: true,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
  img4: {
    type: String,
  },
  img5: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
  },
  qnt: {
    type: Number,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Pending Product model
export const PendingProductModel = mongoose.model(
  "PendingProduct",
  pendingProductSchema
);
