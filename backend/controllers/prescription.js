import Prescription from "../models/prescription.js";
import Appointment from "../models/appointment.js";

const createPrescription = async (req, res) => {
    try {
        const { appointmentId, patientId, diagnosis, medicines, advice } = req.body;
        const doctorId = req.user.id; 

        // console.log("Request Body:", req.body);
        // console.log("Logged in User ID:", req.user?.id);

        const newPrescription = new Prescription({
            appointmentId,
            patientId,
            doctorId,
            diagnosis,
            medicines,
            advice
        });

        await newPrescription.save();

        await Appointment.findByIdAndUpdate(appointmentId, { status: 'completed' });

        res.status(201).json({
            success: true,
            message: "Prescription generated and appointment completed",
            prescription: newPrescription
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPatientPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patientId: req.user.id })
            .populate("doctorId", "name email")
            .sort({ createdAt: -1 });

        res.json({ success: true, prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newPrescription = new Prescription({
      patientId: req.user.id,
      fileUrl: req.file.path,
      type: "upload", 
    });

    await newPrescription.save();

    res.status(201).json({
      message: "Uploaded successfully",
      prescription: newPrescription,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export {
    createPrescription,
    getPatientPrescriptions,
    uploadPrescription,
}