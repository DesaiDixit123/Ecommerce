import { $ProductModel } from "../models/productsModel.js";

export const products = async(req, res) => {
    try {
        const {
            category,
            fields,
            img1,
            img2,
            img3,
            img4,
            img5,
            title,
            price,
            ratings,
            discount,
            qnt,
            discription,
        } = req.body;

        if (!category ||
            !fields ||
            !img1 ||
            !title ||
            !price ||
            !discount ||
            !qnt ||
            !discription
        )
            throw new Error("All fields are requried.");

        const findProducts = await $ProductModel.findOne({
            $or: [{ img1 }, { title }, { discription }],
        });

        if (findProducts) throw new Error("Product already added.");
        const response = await $ProductModel({
            category,
            fields,
            img1,
            img2,
            img3,
            img4,
            img5,
            title,
            price,
            ratings,
            discount,
            qnt,
            discription,
        }).save();

        res.status(200).send({
            process: true,
            message: "Product Added.",
            data: response,
        });
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const getAllProducts = async(req, res) => {
    res.send(await $ProductModel.find({}))
}

export const getProductsByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const products = await $ProductModel.find({ category });

        res.status(200).send({
            process: true,
            message: `Products in category: ${category}`,
            data: products,
        });
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const findProduct = await $ProductModel.findByIdAndDelete(id);

        if (findProduct) {
            res.status(200).send({
                process: true,
                message: "Product deleted successfully.",
                data: findProduct,
            });
        } else {
            throw new Error("Product not found.");
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message,
        });
    }
};

export const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;

        const findProduct = await $ProductModel.findByIdAndUpdate(
            id,
            updatedProduct, {
                new: true,
            }
        );

        if (findProduct) {
            res.status(200).send({
                process: true,
                message: "Product updated successfully."
            })
        } else {
            throw new Error("Product not found.")
        }
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message
        })
    }
};