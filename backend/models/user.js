import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    line1: { type: String, default: "" },
    line2: { type: String, default: "" }
}, { _id: false });

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    address: {
        type: addressSchema,
        default: () => ({})
    },

    city: {
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Not Selected"],
        default: "Not Selected"
    },

    dob: {
        type: Date
    },

    role: {
        type: String,
        enum: ["patient", "doctor", "admin"],
        default: "patient"
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;