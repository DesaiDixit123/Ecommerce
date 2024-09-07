import isEmail from "validator/lib/isEmail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { Country } from "country-state-city";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import { Cart } from "../models/cartModel.js";
import { $ProductModel } from "../models/productsModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: "dsslrk2kp",
  api_key: "499747174164267",
  api_secret: "3yRqcZo3-vwF7HDGXpOObTY6TyM",
});

export const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      format: async (req, file) => "png",
      folder: "Ecommerce-user-profileImg",
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
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

export const getAllCountryWithPhoneCodes = (req, res) => {
  try {
    const countries = Country.getAllCountries();

    const countrieswithphonecode = countries.map((country) => ({
      name: country.name,
      isoCode: country.isoCode,
      phoneCode: country.phonecode,
    }));

    res.status(200).send({
      process: true,
      message: "Country with phone codes retrieved successfully",
      data: countrieswithphonecode,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      username,
      email,
      password,
      confirmPassword,
      Pincode,
      phonecode,
      contactno,
    } = req.body;

    const profileImg = req.file ? req.file.path : null;

    if (
      !fname ||
      !lname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !Pincode ||
      !phonecode ||
      !contactno
    )
      throw new Error("All Fields Are Required");

    const findUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (findUser) throw new Error("User already exists.");

    if (username.length < 3 || username.length > 20)
      throw new Error("Username must be 3 to 20 characters.");
    if (!/^[a-zA-Z0-9._-]+$/.test(username))
      throw new Error(
        "Username can only contain letters, numbers, dots, underscores, and hyphens."
      );

    if (!/^\d{10}$/.test(contactno))
      throw new Error("The contact number must be exactly 10 digits long.");
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters long.");
    if (!/[a-z]/.test(password))
      throw new Error("Password must contain at least one lowercase letter.");
    if (!/[A-Z]/.test(password))
      throw new Error("Password must contain at least one uppercase letter.");
    if (!/[0-9]/.test(password))
      throw new Error("Password must contain at least one number.");
    if (!/[^a-zA-Z0-9]/.test(password))
      throw new Error("Password must contain at least one special character.");
    if (password !== confirmPassword)
      throw new Error("Password and confirm password do not match.");

    const hashPassword = await bcrypt.hash(password, 10);

    if (!isEmail(email)) throw new Error("Invalid email format.");

    const response = await User({
      profileImg,
      fname,
      lname,
      username,
      email,
      password: hashPassword,
      Pincode,
      phonecode,
      contactno,
    }).save();

    res.status(200).send({
      process: true,
      message: "Register Success!",
      data: response,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ process: true, data: users });
  } catch (error) {
    res.status(500).send({ process: false, message: "Failed to fetch users" });
  }
};
export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { identifiers, password } = req.body;

    if (!identifiers) throw new Error("Username/Email Requried.");
    if (!password) throw new Error("Password is requried.");

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifiers);

    let findUser;
    if (isEmail) {
      findUser = await User.findOne({ email: identifiers });
    } else {
      findUser = await User.findOne({ username: identifiers });
    }

    if (!findUser) throw new Error("User not found.");

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (checkPassword) {
      const createToken = jwt.sign(
        { id: findUser._id },
        process.env.secureToken,
        { expiresIn: "30m" }
      );

      await User.findByIdAndUpdate(findUser._id, { token: createToken });

      const cookieExpireTime = 30 * 60 * 1000;
      res
        .cookie("userCookie", createToken, {
          maxAge: cookieExpireTime,
          httpOnly: true,
        })
        .status(200)
        .send({
          process: true,
          message: "Login Success!",
        });
    } else {
      throw new Error("Password is incorrect.");
    }
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const veriFicationUser = (req, res, next) => {
  try {
    const token = req.cookies.userCookie;
    if (!token) throw new Error("Token not found.");

    const verifyToken = jwt.verify(token, process.env.secureToken);

    if (!verifyToken) throw new Error("Token is invalid.");

    req.verifyTokenId = verifyToken.id;
    next();
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const id = req.verifyTokenId;
    if (!id) throw new Error("User not verified.");

    const findUser = await User.findById(id);
    res.status(200).send({
      process: true,
      message: "User verified!",
      userData: findUser,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie("userCookie");
  res.status(200).send({
    process: true,
    message: "Logout Successfully.",
  });
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});

const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex");
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error("Email is requried");

    const findEmail = await User.findOne({ email });

    if (!findEmail) throw new Error("User not found");

    const otp = generateOtp();

    findEmail.resetPasswordOTP = otp;

    findEmail.resetPasswordExpires = Date.now() + 3600000;
    await findEmail.save();

    const mailoption = {
      to: email,
      from: process.env.Email_User,
      subject: "Password reset request.",
      text: `Your OTP for password reset is : ${otp}`,
    };

    transporter.sendMail(mailoption, (err) => {
      if (err) throw new Error("Error sending email.");
      res.status(200).send({
        process: true,
        message: "OTP sent to your email.",
      });
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) throw new Error("Email and otp are requried.");

    const findUser = await User.findOne({ email });
    if (!findUser) throw new Error("User not found");

    if (
      findUser.resetPasswordOTP !== otp ||
      findUser.resetPasswordExpires < Date.now()
    )
      throw new Error("OTP is invalid or has expired.");

    res.status(200).send({
      process: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword)
      throw new Error("All fields are requried.");

    if (newPassword !== confirmPassword)
      throw new Error("Password and confirm password does not match.");

    const findUser = await User.findOne({ email });
    if (!findUser) throw new Error("User not found.");

    const hashPassword = await bcrypt.hash(newPassword, 10);
    findUser.password = hashPassword;

    await findUser.save();
    res.status(200).send({
      process: true,
      message: "Password reset  successfull.",
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    // const userId = req.verifyTokenId
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword)
      throw new Error("All fields are requried.");

    const findUser = await User.findOne({ email });
    if (!findUser) throw new Error("User not found.");

    const ismatch = await bcrypt.compare(oldPassword, findUser.password);
    if (!ismatch) throw new Error("Old password is incorrect.");

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    findUser.password = hashNewPassword;
    await findUser.save();

    res.status(200).send({
      process: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = await User.findByIdAndDelete(id);

    if (findUser) {
      res.status(200).send({
        process: true,
        message: "User deleted successfully.",
        data: findUser,
      });
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser) throw new Error("User not found.");
    const addInWishlist = findUser.wishlist;

    if (addInWishlist.includes(productId))
      throw new Error("Product already added in wishlist.");
    addInWishlist.push(productId);

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { wishlist: addInWishlist }
    );

    console.log({ wishlist: addInWishlist });
    if (updateUser) {
      res.status(200).send({
        process: true,
        message: "Product added to wishlist successfully.",
      });
    }
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser) throw new Error("User not found.");

    const updateStatus = await User.findByIdAndUpdate(userId, {
      wishlist: findUser.wishlist.filter(
        (item) => item.toString() !== productId
      ),
    });

    if (updateStatus) {
      res.status(200).send({
        process: true,
        message: "Product removed from wishlist",
        data: findUser,
      });
    }
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    const validQuantity = Number(quantity);

    if (isNaN(validQuantity) || validQuantity <= 0)
      throw new Error("Invalid quantity value.");

    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found.");

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({
        userId,
        items: [],
        totalAmount: 0,
      
        discount: 0,
      });
    }

    const productIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1)
      throw new Error("Product already added to cart.")
    const product = await $ProductModel.findById(productId).select("discount");
    if (!product) throw new Error("Product not found.");

    const productPrice = Number(product.discount);
    if (isNaN(productPrice) || productPrice <= 0)
      throw new Error("Product price invalid.");

    if (productIndex !== -1) {
      userCart.items[productIndex].quantity += validQuantity;
      userCart.items[productIndex].subTotal = userCart.items[productIndex].quantity * productPrice;
    } else {
      userCart.items.push({
        productId,
        quantity: validQuantity,
        subTotal: validQuantity * productPrice,
      });
    }

    let subTotal = userCart.items.reduce((acc, item) => {
      const itemSubtotal = Number(item.subTotal);
      return isNaN(itemSubtotal) ? acc : acc + itemSubtotal;
    }, 0);


    userCart.totalAmount = subTotal  - userCart.discount;

    userCart.totalAmount = isNaN(userCart.totalAmount)
      ? 0
      : userCart.totalAmount;
    await userCart.save();
    res.status(200).send({
      process: true,
      message: "Product added to cart successfully!",
      data: userCart,
    });

    console.log(userCart);
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const findUser = await User.findById(userId);
    if (!findUser) throw new Error("User not found.");

    // Fetch the user's cart
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      throw new Error("Cart not found.");
    }

    res.status(200).send({
      process: true,
      message: "Cart fetched successfully!",
      data: userCart,
    });
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Recalculate subtotal and total
    let subtotal = 0;
    const updatedItems = [];

    for (const item of items) {
      const product = await $ProductModel
        .findById(item.productId)
        .select("discount");
      if (!product) throw new Error("Product not found.");

      const productPrice = Number(product.discount);
      if (isNaN(productPrice) || productPrice <= 0)
        throw new Error("Product price invalid.");

      const itemSubTotal = item.quantity * productPrice;
      updatedItems.push({ ...item, subTotal: itemSubTotal });
      subtotal += itemSubTotal;

      // Debugging logs
      console.log("Product price:", productPrice);
      console.log("Item subtotal:", itemSubTotal);
    }

  
    const grandTotal = subtotal ;

    // Update cart details
    cart.items = updatedItems;
    cart.subtotal = subtotal;
    // cart.shippingCost = shippingCost;
    cart.totalAmount = grandTotal;

    // Debugging log
    console.log("Updated cart before saving:", cart);

    // Save updated cart
    await cart.save();

    res.status(200).json({
      process: true,
      message: "Cart updated successfully!",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) throw new Error("Cart not found.");

    cart.items = [];
    cart.totalAmount = 0;
    // cart.shippingCost = 0;
    cart.subtotal = 0;

    await cart.save();

    res.status(200).send({
      process: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    res.status(500).send({
      process: false,
      message: error.message,
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) throw new Error("Cart not found.");

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    
    // Recalculate totals after removal
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subTotal, 0);

    cart.subtotal = cart.totalAmount;

    await cart.save();

    res.status(200).send({
      process: true,
      message: "Product removed from cart successfully.",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      process: false,
      message: error.message,
    });
  }
};
