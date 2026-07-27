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
                degree: "",
                experience: 0,
                fees: 500,
                isActive: true,
                availability: []
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

        user.lastLogin = Date.now();
        await user.save();

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

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let profile = user.toObject();

        if (user.role === "doctor") {
            const doctor = await Doctor.findOne({ userId: user._id });
            if (doctor) {
                profile = {
                    ...profile,
                    specialty: doctor.specialty,
                    degree: doctor.degree,
                    experience: doctor.experience,
                    hospital: doctor.hospital,
                    fees: doctor.fees,
                };
            }
        }

        res.json(profile);
    }catch(err){
        res.status(500).json({
            message:"Failed to fetch profile"
        });
    }
};

const updateProfile = async (req,res)=>{

    try{
        const { specialty, degree, experience, hospital, fees, ...userFields } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            userFields,
            {new:true}
        ).select("-password");

        let profile = updatedUser.toObject();

        if (updatedUser.role === "doctor") {
            const doctorUpdate = {};
            if (specialty !== undefined) doctorUpdate.specialty = specialty;
            if (degree !== undefined) doctorUpdate.degree = degree;
            if (experience !== undefined) doctorUpdate.experience = experience;
            if (hospital !== undefined) doctorUpdate.hospital = hospital;
            if (fees !== undefined) doctorUpdate.fees = fees;

            const doctor = await Doctor.findOneAndUpdate(
                { userId: updatedUser._id },
                doctorUpdate,
                { new: true }
            );

            if (doctor) {
                profile = {
                    ...profile,
                    specialty: doctor.specialty,
                    degree: doctor.degree,
                    experience: doctor.experience,
                    hospital: doctor.hospital,
                    fees: doctor.fees,
                };
            }
        }

        res.json({
            message:"Profile updated",
            user:profile
        });

    }catch(err){

        res.status(500).json({
            message:"Update failed"
        });

    }

};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    handleUserSignup,
    handleUserLogin,
    getProfile,
    updateProfile,
    getAllUsers,
};