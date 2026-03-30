import express from "express";
import { 
    createPrescription, 
    getPatientPrescriptions,
    uploadPrescription, 
} from "../controllers/prescription.js";
import upload from "../config/upload.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", protect, createPrescription);
router.get("/my", protect, getPatientPrescriptions);
router.post("/upload", protect, upload.single("file"), uploadPrescription);

export default router;