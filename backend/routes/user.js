import express from "express";
import {
    handleUserSignup,
    handleUserLogin,
    getProfile,
    updateProfile,
    getAllUsers,
} from "../controllers/user.js";
import { protect, adminOnly } from"../middlewares/auth.js";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/allUsers", protect, adminOnly, getAllUsers);

export default router;