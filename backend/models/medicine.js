import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    category: { 
        type: String, 
        enum: ['Tablets', 'Syrups', 'Injections', 'Supplements', 'Other'], 
        default: 'Tablets' 
    },
    stock: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    price: { 
        type: Number, 
        required: true 
    },
    expiryDate: { 
        type: Date, 
        required: true 
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

// Virtual to check if stock is low
medicineSchema.virtual('isLowStock').get(function() {
    return this.stock < 10;
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;