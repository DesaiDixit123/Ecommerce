import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogin = async(req, res) => {
    try {
        const { identifiers, password } = req.body;

        if (!identifiers) throw new Error("Username/email requried.");
        if (!password) throw new Error("Password is requried.");

        const findAdmin = await User.findOne({
            $or: [{ email: identifiers }, { username: identifiers }],
        });

        if (!findAdmin) throw new Error("Admin not found");
        if (!findAdmin.isAdmin) throw new Error("You are not Admin.");

        const checkPassword = await bcrypt.compare(password, findAdmin.password);

        if (checkPassword) {
            const createToken = jwt.sign({ id: findAdmin._id },
                process.env.secureToken, { expiresIn: "30m" }
            );

            await User.findByIdAndUpdate(findAdmin._id, {
                token: createToken,
            });

            const cookieExpireTime = 30 * 60 * 1000;
            res
                .cookie("adminCookie", createToken, {
                    maxAge: cookieExpireTime,
                    httpOnly: true,
                })
                .status(200)
                .send({
                    process: true,
                    message: "Admin Login Success!",
                    data: findAdmin
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

export const adminVerification = async(req, res, next) => {
    try {
        const token = req.cookies.adminCookie
        if (!token) throw new Error("Token not found.")

        const tokenVerify = jwt.verify(token, process.env.secureToken)
        if (!tokenVerify) throw new Error("Token is invalid.")

        req.tokenVerifyId = tokenVerify.id
        next()
    } catch (error) {
        res.status(201).send({
            process: false,
            message: error.message
        })

    }
}

export const verifyAdmin = async(req, res) => {
    try {
        const id = req.tokenVerifyId
        if (!id) throw new Error("Admin not verified.")
        const findAdmin = await User.findById(id)
        res.status(200).send({
            process: true,
            message: "Admin Verified!",
            data: findAdmin
        })
    } catch (error) {
        res.status(200).send({
            process: false,
            message: error.message
        })
    }
}