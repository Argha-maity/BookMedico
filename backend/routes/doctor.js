import express from "express";
import { 
    addDoctor,
    getAllDoctors,
    getDoctor
} from "../controllers/doctor.js";
import { protect,adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, adminOnly, addDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctor);

export default router;