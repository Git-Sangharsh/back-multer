import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    image: String,
    imgName: String
})

const userModel = mongoose.model("users", userSchema)
export default userModel