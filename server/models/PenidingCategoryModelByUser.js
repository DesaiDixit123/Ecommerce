import mongoose, { model, Schema } from "mongoose";

export const pendingCategorySchema = Schema({
  userId: String,
  categoryname: { type: String, required: true, unique: true },
  fields: { type: [String], default: [] },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const pendingCategoryModel = model(
  "pendingCategory",
  pendingCategorySchema
);
