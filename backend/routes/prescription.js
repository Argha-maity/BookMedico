import express from "express";
import { 
    createPrescription, 
    getPatientPrescriptions 
} from "../controllers/prescription.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", protect, createPrescription);
router.get("/my", protect, getPatientPrescriptions);

export default router;