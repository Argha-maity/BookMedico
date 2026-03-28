import API from "./axios";

export const bookAppointment = async (data) => {
  const res = await API.post("/appointments/book", data);
  return res.data;
};

// GET PATIENT APPOINTMENTS
export const getMyAppointments = async () => {
  const res = await API.get("/appointments/my");
  return res.data;
};

// GET ALL (ADMIN)
export const getAllAppointments = async () => {
  const res = await API.get("/appointments/all");
  return res.data;
};

export const getDoctorAppointments = async () => {
  const res = await API.get("/appointments/doctor");
  return res.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const res = await API.patch(`/appointments/status/${appointmentId}`, { status });
  return res.data;
};