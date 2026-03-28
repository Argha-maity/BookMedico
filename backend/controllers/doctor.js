import Doctor from "../models/doctor.js";

const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor({
      ...req.body,
      userId: req.user.id
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      doctor
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true });

    res.json({
      success: true,
      doctors
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.json({
      success: true,
      doctor
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export {
    addDoctor,
    getAllDoctors,
    getDoctor,
};