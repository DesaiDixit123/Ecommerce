import { categoryModel } from "../models/categoryModel.js";

export const categories = async(req, res) => {
    try {
        const { categoryname, fields } = req.body;
        if (!categoryname) throw new Error("Enter the category.");
        if (!Array.isArray(fields))
            throw new Error("Enter the fields as an array.");
        if (fields.length === 0) throw new Error("Fields array cannot be empty.");

        const category = await categoryModel.findOne({ categoryname });

        if (category) {
            const uniqueFields = Array.from(new Set([...category.fields, ...fields]));
            category.fields = uniqueFields;
            const updatedcategory = await category.save();
            res.status(200).send({
                process: true,
                message: "Category updated successfully.",
                data: updatedcategory,
            });
        } else {
            const response = await categoryModel({ categoryname, fields }).save();
            res.status(200).send({
                process: true,
                message: "Category added.",
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

export const getAllCategory = async(req, res) => {
    res.send(await categoryModel.find({}));
};

export const getFieldsForCategory = async(req, res) => {
    try {
        const { categoryname } = req.params;

        if (!categoryname) throw new Error("Category name is required.");

        const category = await categoryModel.findOne({ categoryname });

        if (!category) throw new Error("Category not found.");

        res.status(200).send({
            success: true,
            fields: category.fields,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};