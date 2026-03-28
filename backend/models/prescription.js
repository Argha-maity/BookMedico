import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Appointment', required: true 
    },
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    diagnosis: { 
        type: String, 
        required: true },
    medicines: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g., "1-0-1"
        duration: { type: String, required: true }, // e.g., "5 Days"
    }],
    advice: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;