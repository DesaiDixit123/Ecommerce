import isEmail from "validator/lib/isEmail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { Country } from "country-state-city";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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