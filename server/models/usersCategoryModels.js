import { model, Schema } from "mongoose";

const usersCategorySchema = new Schema({
    categoryname: { type: String, required: true, unique: true },
    fields: { type: [String], default: [] }
});

export const usersCategoryModel = model("usersCategories", usersCategorySchema);