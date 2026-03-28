import express from "express";
import { 
    bookAppointment,
    getAllAppointments,
    getMyAppointments,
    getDoctorAppointments, 
    updateAppointmentStatus,
} from "../controllers/appointment.js";
import { adminOnly, protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/book",protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/doctor", protect, getDoctorAppointments);
router.get("/all", protect, adminOnly, getAllAppointments);
router.patch("/status/:id", protect, updateAppointmentStatus);

export default router;