import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true
  },

  specialty: {
    type: String,
    required: true
  },

  experience: {
    type: Number, // in years
    required: true
  },

  hospital: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  fees: {
    type: Number,
    default: 0
  },

  image: {
    type: String, // URL or uploaded file path
    default: ""
  },

  availability: [
    {
      day: String, // Monday, Tuesday...
      slots: [String] // ["09:00 AM", "10:00 AM"]
    }
  ],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

const Doctor =  mongoose.model("Doctor", doctorSchema);
export default Doctor;