import express from "express";
import userRoutes from "./user.js";
import doctorRoutes from "./doctor.js";
import appointmentRoutes from "./appointment.js";
import prescriptionRoutes from "./prescription.js";
import medicineRoutes from "./medicine.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/prescriptions", prescriptionRoutes);
router.use("/inventory", medicineRoutes);

export default router;