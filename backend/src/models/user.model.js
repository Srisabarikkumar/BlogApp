import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic: {
      type: String,
      default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);