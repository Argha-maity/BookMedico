import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";

const bookAppointment = async (req, res) => {
    try {
        const { doctorId, slotDate, slotTime } = req.body;
        const patientId = req.user?.id || req.body.patientId;

        const existing = await Appointment.findOne({
            doctorId,
            slotDate,
            slotTime
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Slot already booked"
            });
        }

        const appointment = new Appointment({
            patientId,
            doctorId,
            slotDate,
            slotTime,
            amount: 500 
        });
        await appointment.save();
        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slot just got booked by someone else"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//Patient appointments
const getMyAppointments = async (req, res) => {
    try {
        const patientId = req.user?.id || req.body.patientId;

        const appointments = await Appointment.find({ patientId })
            .populate("doctorId", "name speciality");

        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDoctorAppointments = async (req, res) => {
  try {
    //console.log("Logged in User ID:", req.user.id);
    const doctor = await Doctor.findOne({ userId: req.user.id });
    //console.log("Found Doctor Profile:", doctor);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found"
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id
    })
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patientId", "name")
            .populate("doctorId", "name speciality");

        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!allowedStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status type" 
            });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status: status.toLowerCase() },
            { returnDocument: 'after' } 
        );

        if (!updatedAppointment) {
            return res.status(404).json({ 
                success: false, 
                message: "Appointment not found" 
            });
        }

        res.json({
            success: true,
            message: `Appointment marked as ${status}`,
            appointment: updatedAppointment
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    getAllAppointments,
    updateAppointmentStatus,
};