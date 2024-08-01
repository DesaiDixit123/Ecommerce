import { model, Schema } from "mongoose"
const userSchema = Schema({
    profileImg: { type: String },
    fname: { type: String },
    lname: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    phonecode: { type: String },
    contactno: { type: String }
})


export const User = model("user", userSchema)