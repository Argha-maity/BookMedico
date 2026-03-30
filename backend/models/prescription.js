import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment',
    default: null
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  },

  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  fileUrl: { type: String, default: null },

  diagnosis: { type: String, default: "" },

  medicines: [{
    name: String,
    dosage: String,
    duration: String,
  }],

  advice: { type: String, default: "" },

  type: { 
    type: String, 
    enum: ["doctor", "upload"], 
    default: "doctor" 
  },

  date: { type: Date, default: Date.now }

}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);