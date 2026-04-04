import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getProfile } from "../../services/auth";
import { getDoctors } from "../../services/doctorService";
import { useNavigate } from "react-router-dom";
import { getMyAppointments, bookAppointment } from "../../services/appointmentService";
import { uploadPrescription } from "../../services/prescriptionService";
import {
  Calendar,
  MapPin,
  ShoppingBag,
  Stethoscope,
  Sparkles,
  ChevronRight,
  X,
  Clock,
  User,
  Activity
} from "lucide-react";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // State for Appointment Detail Popup
  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = async () => {
    try {
      const res = await getMyAppointments();
      setAppointments(res?.appointments || res?.data || res || []);
    } catch (err) {
      console.error(err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const loadDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res?.doctors || res?.data || res || []);
      } catch (err) {
        console.error(err);
        setDoctors([]);
      }
    };

    fetchProfile();
    loadDoctors();
    loadAppointments();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment({
        doctorId: selectedDoctor,
        slotDate: date,
        slotTime: time,
        amount: 500
      });
      alert("Appointment booked!");
      setShowBooking(false);
      loadAppointments(); // Refresh list after booking
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const handlePrescriptionUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    await uploadPrescription(formData); // create this API
    alert("Uploaded & sent for AI analysis");
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};

  return (
    <DashboardLayout role="patient">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome back, {user?.name || "Patient"}
          </h2>
          <p className="text-slate-500 font-medium">
            Your health and medications at a glance.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowBooking(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Calendar size={18} /> Book Appointment
          </button>
          <button className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer">
            <ShoppingBag size={18} /> Buy Medicine
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* SERVICE CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ServiceCard
              icon={<Stethoscope className="text-primary" />}
              label="All Doctors"
              onClick={() => navigate("/patient/doctors")}
            />
            <ServiceCard
              icon={<MapPin className="text-blue-500" />}
              label="Nearby Stores"
              onClick={() => navigate("/medical-stores")}
            />
            <ServiceCard
              icon={<ShoppingBag className="text-orange-500" />}
              label="Pharmacy"
            />
            <ServiceCard
              icon={<Sparkles className="text-purple-500" />}
              label="AI Analyze"
              isNew
            />
          </div>

          {/* APPOINTMENT HISTORY */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Appointment History</h3>
            </div>

            <div className="space-y-4">
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt._id} onClick={() => setSelectedAppt(appt)} className="cursor-pointer">
                    <AppointmentRow
                      name={appt.doctorId?.name || "Doctor"}
                      date={appt.slotDate}
                      status={appt.status}
                      type={appt.doctorId?.speciality || "General"}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-4 text-sm font-medium">No appointments found.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-[2.5rem] shadow-xl">
            <h4 className="text-lg font-bold mb-2">Prescription AI Analysis</h4>
            <p className="text-slate-400 text-sm mb-4">Upload prescription to analyze medicines and dosage.</p>
            <label className="block">
              <div className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold text-center cursor-pointer hover:bg-slate-100 transition-all">
                Upload Prescription
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handlePrescriptionUpload}
              />
            </label>
          </div>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <MapPin size={16} /> Nearby Stores
            </h4>
            <p className="text-xs text-emerald-700">3 stores within 2km.</p>
          </div>
        </div>
      </div>

      {/* APPOINTMENT DETAIL POPUP */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-slate-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppt(null)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4 text-slate-700 font-medium">
              <DetailRow label="Doctor Name" value={`Dr. ${selectedAppt.doctorId?.name || "N/A"}`} />
              <DetailRow label="Specialization" value={selectedAppt.doctorId?.speciality || "General Physician"} />

              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Date" value={selectedAppt.slotDate} />
                <DetailRow label="Time Slot" value={selectedAppt.slotTime} />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Status</p>
                  <p className={`font-bold capitalize ${selectedAppt.status === 'completed' ? 'text-emerald-600' : 'text-primary'
                    }`}>
                    {selectedAppt.status}
                  </p>
                </div>
                {selectedAppt.status === 'completed' && (
                  <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold">
                    View Prescription
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedAppt(null)}
              className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* BOOKING POPUP */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[420px] shadow-xl">
            <h3 className="text-xl font-bold mb-6">Book Appointment</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:border-primary transition-all"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:border-primary transition-all"
              />

              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 border rounded-xl outline-none focus:border-primary transition-all"
              >
                <option value="">Select Time Slot</option>
                <option>09:00 AM</option>
                <option>10:30 AM</option>
                <option>12:00 PM</option>
                <option>03:00 PM</option>
                <option>05:00 PM</option>
                <option>07:00 PM</option>
              </select>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-slate-50 transition-all font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-xl font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Helper Components
const DetailRow = ({ label, value, color = "text-slate-900" }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">{label}</p>
    <p className={`font-bold ${color}`}>{value || "N/A"}</p>
  </div>
);

const ServiceCard = ({ icon, label, isNew, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-center text-center"
  >
    <div className="mb-3 p-3 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
      {icon}
    </div>
    <span className="text-sm font-bold text-slate-700">{label}</span>
    {isNew && (
      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1 font-bold">
        NEW
      </span>
    )}
  </div>
);

const AppointmentRow = ({ name, date, status, type }) => (
  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
        {name[0]}
      </div>
      <div>
        <p className="font-bold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500 font-medium">{type} • {date}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-primary/10 text-primary'
        }`}>
        {status}
      </span>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-all" />
    </div>
  </div>
);

export default PatientDashboard;