import express from "express";
import {
    handleUserSignup,
    handleUserLogin,
    getProfile,
    updateProfile
} from "../controllers/user.js";
import { protect } from"../middlewares/auth.js";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;