import Medicine from "../models/medicine.js";

const updateInventory = async (req, res) => {
    try {
        const { name, category, stock, price, expiryDate } = req.body;

        const medicine = await Medicine.findOneAndUpdate(
            { name: name.trim() },
            { 
                category, 
                $inc: { stock: Number(stock) }, // Increment existing stock
                price, 
                expiryDate,
                addedBy: req.user.id 
            },
            { upsert: true, returnDocument: 'after', runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Inventory updated successfully",
            medicine
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllMedicines = async (req, res) => {
    try {
        const inventory = await Medicine.find().sort({ name: 1 });
        res.json({ success: true, inventory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteMedicine = async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Medicine removed from inventory" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    updateInventory,
    getAllMedicines,
    deleteMedicine,
};