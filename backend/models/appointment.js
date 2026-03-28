import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor',
        required: true 
    },
    slotDate: { type: String, required: true }, // Format: "YYYY-MM-DD"
    slotTime: { type: String, required: true }, // Format: "10:30 AM"
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], 
        default: 'Pending' 
    },
    amount: { type: Number, required: true },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Failed'], 
        default: 'Pending' 
    }
}, { timestamps: true });

appointmentSchema.index(
  { doctorId: 1, slotDate: 1, slotTime:1 },
  { unique: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;