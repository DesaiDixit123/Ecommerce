// // import { PendingProductModel } from "../models/pendingProductModel.js";

// import { PendingProductModel } from "../models/PendingProductModelByUser.js";

// // const upload = multer({
// //     storage: new CloudinaryStorage({
// //       cloudinary: cloudinary,
// //       params: {
// //         folder: "Ecommerce-Products",
// //         allowed_formats: ["jpg", "jpeg", "png", "gif"],
// //         transformation: [{ width: 500, height: 500, crop: "limit" }],
// //       },
// //     }),

// //     fileFilter: (req, file, cb) => {
// //       if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// //         return cb(new Error("Only image files are allowed!"), false);
// //       }
// //       cb(null, true);
// //     },
// //     limits: { fileSize: 1024 * 1024 * 5 },
// //   });

// //   export const uploadImages = upload.fields([
// //     { name: "img1", maxCount: 1 },
// //     { name: "img2", maxCount: 2 },
// //     { name: "img3", maxCount: 3 },
// //     { name: "img4", maxCount: 4 },
// //     { name: "img5", maxCount: 5 },
// //   ]);
// export const usersProducts = async (req, res) => {
//   try {
//     const {
//       category,
//       fields,
//       title,
//       price,
//       ratings,
//       discount,
//       qnt,
//       discription,
//     } = req.body;

//     // Get the images from req.files
//     const img1 = req.files.img1 ? req.files.img1[0].path : null;
//     const img2 = req.files.img2 ? req.files.img2[0].path : null;
//     const img3 = req.files.img3 ? req.files.img3[0].path : null;
//     const img4 = req.files.img4 ? req.files.img4[0].path : null;
//     const img5 = req.files.img5 ? req.files.img5[0].path : null;

//     if (!category || !fields || !title || !price || !discount || !qnt || !discription) {
//       throw new Error("All fields are required.");
//     }

//     // Check for existing product
//     const findProducts = await PendingProductModel.findOne({
//       $or: [{ img1 }, { title }, { discription }],
//     });

//     if (findProducts) throw new Error("Product already added.");

//     // Save the pending product for admin approval
//     const response = await PendingProductModel({
//       category,
//       fields,
//       img1,
//       img2,
//       img3,
//       img4,
//       img5,
//       title,
//       price,
//       ratings,
//       discount,
//       qnt,
//       discription,

//     }).save();

//     res.status(200).send({
//       process: true,
//       message: "Product submitted for approval.",
//       data: response,
//     });
//   } catch (error) {
//     res.status(400).send({
//       process: false,
//       message: error.message,
//     });
//   }

// };

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { PendingProductModel } from "../models/PendingProductModelByUser.js";
import { Notification } from "../models/notificationAdmin.js";
import mongoose from "mongoose";

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
    // console.log(req.body);
    //   console.log(req.files);
    console.log();

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

    // console.log(img1);
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
    const findProducts = await PendingProductModel.findOne({
      $or: [{ img1 }, { title }, { discription }],
    });

    if (findProducts) throw new Error("Product already added.");
    if (!req.verifyTokenId) {
      throw new Error("User not authenticated.");
    }
    // Save the new product in the database
    const response = await PendingProductModel({
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
      addedBy: req.verifyTokenId, // Add reference to the user who added the product
      status: "Pending",
    }).save();
    const admin = await User.findOne({ isAdmin: true });
    const adminNotification = new Notification({
      userId: req.verifyTokenId,
      title: "New Product Submitted",
      message: `A new product titled "${title}" has been submitted by a user and is awaiting approval.`,
      recipient: admin._id, // Replace with actual admin ID
      products: 
        {
          productId: response._id, 
          category,
          fields,
          img1,
          img2,
          img3,
          img4,
          img5,
          title,
          price,
          discount,
          discription,
        },
   
    });

    await adminNotification.save();
    res.status(200).send({
      process: true,
      message: "Product submitted for approval.",
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};
