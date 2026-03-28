import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt_secret.js";
import Doctor from "../models/doctor.js";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "30d" }
    );
};

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || "patient" 
        });

        if (role === "doctor") {
            await Doctor.create({
                userId: user._id, 
                name,
                phone,
                specialty: "General Physician", 
                experience: 0,
                fees: 500,
                isActive: true,
                availability: {}
            });
        }

        const token = generateToken(user);

        res.status(201).json({
            message: "Signup successful",
            token,
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Signup failed",
            error: err.message
        });
    }
}

const handleUserLogin = async (req, res) => {
    try{
        const {email,phone,password} = req.body;

        const user = await User.findOne({
            $or:[{email},{phone}]
        });

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        const token = generateToken(user);

        res.json({
            message:"Login successful",
            token,
            user
        });
    }catch(err){
        res.status(500).json({
            message:"Login failed",
            error:err.message
        });
    }
}

const getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        res.status(500).json({
            message:"Failed to fetch profile"
        });
    }
};

const updateProfile = async (req,res)=>{

    try{

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {new:true}
        ).select("-password");

        res.json({
            message:"Profile updated",
            user:updatedUser
        });

    }catch(err){

        res.status(500).json({
            message:"Update failed"
        });

    }

};

export {
    handleUserSignup,
    handleUserLogin,
    getProfile,
    updateProfile,
};