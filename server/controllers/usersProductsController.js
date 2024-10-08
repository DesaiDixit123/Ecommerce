// import { $ProductModel } from "../models/productsModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { $UserProductModel } from "../models/usersProductsModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: "dsslrk2kp",
  api_key: "499747174164267",
  api_secret: "3yRqcZo3-vwF7HDGXpOObTY6TyM",
});

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Ecommerce-Products",
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

export const uploadImages = upload.fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 2 },
  { name: "img3", maxCount: 3 },
  { name: "img4", maxCount: 4 },
  { name: "img5", maxCount: 5 },
]);
export const usersProducts = async (req, res) => {
  try {
    // Log the incoming request body and files to debug
    console.log(req.body);
    console.log(req.files);

    const {
      category,
      fields,
      title,
      price,
      ratings,
      discount,
      qnt,
      discription,
    } = req.body;

    // Assigning file paths from req.files to variables
    const img1 = req.files.img1 ? req.files.img1[0].path : null;
    const img2 = req.files.img2 ? req.files.img2[0].path : null;
    const img3 = req.files.img3 ? req.files.img3[0].path : null;
    const img4 = req.files.img4 ? req.files.img4[0].path : null;
    const img5 = req.files.img5 ? req.files.img5[0].path : null;

    console.log(img1);
    // Validate all required fields and images
    if (
      !category ||
      !fields ||
      !title ||
      !price ||
      !discount ||
      !qnt ||
      !discription
    ) {
      throw new Error("All fields are required.");
    }

    // Check if a product with the same img1, title, or description already exists
    const findProducts = await $UserProductModel.findOne({
      $or: [{ img1 }, { title }, { discription }],
    });

    if (findProducts) throw new Error("Product already added.");

    // Save the new product in the database
    const response = await $UserProductModel({
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
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  res.send(await $UserProductModel.find({}));
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await $UserProductModel.find({ category });

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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await $UserProductModel.findByIdAndDelete(id);

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
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ process: false, message: "Product ID is missing." });
    }

    const updatedProductData = req.body;
    const files = req.files || {};

    const existingProduct = await $UserProductModel.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .send({ process: false, message: "Product not found." });
    }

    if (files.img1) updatedProductData.img1 = files.img1[0].path;
    if (files.img2) updatedProductData.img2 = files.img2[0].path;
    if (files.img3) updatedProductData.img3 = files.img3[0].path;
    if (files.img4) updatedProductData.img4 = files.img4[0].path;
    if (files.img5) updatedProductData.img5 = files.img5[0].path;

    const updatedProduct = await $UserProductModel.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );

    res.status(200).send({
      process: true,
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(201).send({ process: false, message: error.message });
  }
};
export const filterProductsByRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    if (min === undefined || max === undefined) {
      res.status(201).send({
        process: false,
        message: "Please provide both min and max values for the range.",
      });
    }

    const product = await $UserProductModel.find({
      discount: {
        $gte: min,
        $lte: max,
      },
    });

    if (product.length === 0) {
      res.status(200).send({
        process: true,
        message: `No products found within the price range ₹${min} - ₹${max}.`,
        data: [],
      });
    }

    res.status(200).send({
      process: true,
      message: `Products within the price range ₹${min} - ₹${max}.`,
      data: product,
    });
  } catch (error) {
    res.status(201).send({
      process: true,
      message: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(201).send({
        process: false,
        message: "Please provide a search query",
      });
    }

    const products = await $UserProductModel.find({
      $or: [
        { title: { $regex: `^${query}`, $options: "i" } },
        { category: { $regex: `^${query}`, $options: "i" } },
        { fields: { $regex: `^${query}`, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(200).send({
        process: true,
        message: `No products found for query: ${query}`,
        data: [],
      });
    }

    return res.status(200).send({
      process: true,
      message: `Products found for query: ${query}`,
      data: products,
    });
  } catch (error) {
    return res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        process: false,
        message: "Product ID is required.",
      });
    }

    const product = await $UserProductModel.findById(id);

    if (!product) {
      return res.status(404).send({
        process: false,
        message: "Product not found.",
      });
    }

    res.status(200).send({
      process: true,
      message: "Product details fetched successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      process: false,
      message: error.message,
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) throw new Error("Product Id is requried.");

    const product = await $UserProductModel.findById(productId);

    console.log(product)
    if (!product) throw new Error("Product not found.");

    const reletedProducts = await $UserProductModel
      .find({
        fields: { $in: product.fields },
        _id: { $ne: productId },
      })
      .limit(5);

      console.log(reletedProducts)
    res.status(200).send({
      process: true,
      message: "Related products fetched successfully.",
      data: reletedProducts,
    });
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};
