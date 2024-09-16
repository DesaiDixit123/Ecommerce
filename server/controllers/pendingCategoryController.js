import { categoryModel } from "../models/categoryModel.js";
import { pendingCategoryModel } from "../models/PenidingCategoryModelByUser.js";
import { User } from "../models/userModel.js";

export const pendingCategory = async (req, res) => {
    try {
        const { categoryname, fields } = req.body;

        // Check if categoryname is provided
        if (!categoryname) throw new Error("Enter the category.");

        // Check if fields is provided and is a non-empty array
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
            throw new Error("Enter the fields.");
        }

        const admin = await User.findOne({ isAdmin: true });

        const category = await pendingCategoryModel.findOne({ categoryname });

        if (category) {
            const uniqueFields = Array.from(new Set([...category.fields, ...fields]));
            category.fields = uniqueFields;
            const updatedCategory = await category.save();
            res.status(200).send({
                process: true,
                message: "Category updated successfully.",
                data: updatedCategory,
            });
        } else {
            const response = await pendingCategoryModel({
                userId: req.verifyTokenId,
                recipient: admin._id,
                categoryname,
                fields,
            }).save();
            res.status(200).send({
                process: true,
                message: "Category Submitted For Approval.",
                data: response,
            });
        }
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

export const approveCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!categoryId) throw new Error("Category ID is required.");

        // Find the pending category
        const pendingCategory = await pendingCategoryModel.findById(categoryId);
        if (!pendingCategory) throw new Error("Category not found.");

        // Add category to the approved model
        const { categoryname, fields } = pendingCategory;
        const approvedCategory = new categoryModel({ categoryname, fields });
        await approvedCategory.save();

        // Remove from pending categories
        await pendingCategoryModel.findByIdAndDelete(categoryId);

        res.status(200).send({
            process: true,
            message: "Category approved and added.",
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
}

export const getCategoryUsers = async (req, res) => {
    try {
        const categories = await pendingCategoryModel
            .find({})
            .populate("recipient", "fname lname email"); // Populate recipient with fname, lname, and email

        res.status(200).send({
            process: true,
            message: "GetCategoryFetch Successfully",
            data: categories,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

  

export const deleteCategoryUsers = async (req, res) => {
      try {
        const {categoryId}=req.params

          if (!categoryId)
            throw new Error("Category is not defined.")

          const deleteCategory = await pendingCategoryModel.findByIdAndDelete(categoryId);
          if (!deleteCategory)
              throw new Error("Category not found.")

          res.status(200).send({
              process: true,
              message: "User notified category deleted.",
              data:deleteCategory

          })
      } catch (error) {
          res.status(201).send({
              process: false,
              message:error.message
        })
      }
  }