import express from "express";
import { 
    updateInventory, 
    getAllMedicines, 
    deleteMedicine 
} from "../controllers/medicine.js";
import { protect, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/update", protect, adminOnly, updateInventory);
router.get("/all", protect, getAllMedicines);
router.delete("/:id", protect, adminOnly, deleteMedicine);

export default router;