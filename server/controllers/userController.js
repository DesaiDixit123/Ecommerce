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
            format: async(req, file) => "png",
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

export const register = async(req, res) => {
    try {
        const {
            fname,
            lname,
            username,
            email,
            password,
            confirmPassword,
            phonecode,
            contactno,
        } = req.body;

        const profileImg = req.file ? req.file.path : null;

        if (!fname ||
            !lname ||
            !username ||
            !email ||
            !password ||
            !confirmPassword ||
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
export const getAllUser = async(req, res) => {
    res.status(200).send(await User.find({}));
};
export const login = async(req, res) => {
    try {
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
            const createToken = jwt.sign({ id: findUser._id },
                process.env.secureToken, { expiresIn: "2m" }
            );

            await User.findByIdAndUpdate(findUser._id, { token: createToken });

            const cookieExpireTime = 2 * 60 * 1000;
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

export const verifyUser = async(req, res) => {
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

export const forgetPassword = async(req, res) => {
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

export const verifyOTP = async(req, res) => {
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

export const resetPassword = async(req, res) => {
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

export const updatePassword = async(req, res) => {
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