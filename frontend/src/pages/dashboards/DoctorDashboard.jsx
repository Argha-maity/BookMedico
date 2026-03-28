import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getProfile } from "../../services/auth";
import { getDoctorAppointments, updateAppointmentStatus } from "../../services/appointmentService";
import PrescriptionPad from "../doctors/PrescriptionPad";
import { savePrescription } from "../../services/prescriptionService";
import {
  FileText, PlusCircle, AlertTriangle, User,
  Search, Download, Pill, ChevronRight, Activity, Clock,
  X, Check, CheckCircle, Ban
} from "lucide-react";

const DoctorDashboard = () => {
  const [view, setView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = async () => {
    try {
      const res = await getDoctorAppointments();
      setAppointments(res?.appointments || res?.data || []);
    } catch (err) {
      console.error("Error loading appointments:", err);
      setAppointments([]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) { console.error(err); }
    };

    fetchProfile();
    loadAppointments();
  }, []);

  const handleHeaderPrescriptionClick = () => {
    if (selectedAppt) {
      setView("prescription");
    } else {
      alert("Please select a patient from the Current Queue to start writing a prescription.");

      document.getElementById('appointment-queue')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSavePrescription = async (prescriptionData) => {
    try {
      const res = await savePrescription(prescriptionData);

      if (res.success) {
        alert("Prescription Saved Successfully!");
        setView("dashboard");
        setSelectedAppt(null);
        loadAppointments(); // Refresh the queue
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error saving prescription");
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      if (newStatus === 'completed') {
        setView("prescription");
        return;
      }
      await updateAppointmentStatus(appointmentId, newStatus);
      setSelectedAppt(null);
      await loadAppointments();
    } catch (err) {
      alert("Error updating appointment status");
    }
  };

  if (view === "prescription" && selectedAppt) {
    return (
      <DashboardLayout role="doctor">
        <PrescriptionPad
          appointment={selectedAppt}
          onBack={() => setView("dashboard")}
          onSave={handleSavePrescription}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="doctor">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            Dr. {user?.name || "Physician"}
          </h2>
          <p className="text-slate-500 font-medium italic">General Medicine • Apex Medical Center</p>
        </div>

        {/*Always active and styled button */}
        <button
          onClick={handleHeaderPrescriptionClick}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
          Digital Prescription Pad
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {/* Patient Documents Vault */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FileText className="text-primary" size={22} /> Patient Documents
              </h3>
            </div>
            <div className="space-y-3">
              <DocumentRow name="Rahul Sharma" file="Blood_Report_v2.pdf" date="Mar 14, 2026" />
              <DocumentRow name="Anita Singh" file="X-Ray_Chest.jpg" date="Mar 12, 2026" />
            </div>
          </div>

          {/* Today's Appointment Queue */}
          <div id="appointment-queue" className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Current Queue</h3>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div
                    key={appt._id}
                    onClick={() => setSelectedAppt(appt)}
                    className={`cursor-pointer rounded-3xl transition-all ${selectedAppt?._id === appt._id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  >
                    <QueueItem
                      name={appt.patientId?.name || "Patient"}
                      time={appt.slotTime}
                      status={appt.status}
                      active={selectedAppt?._id === appt._id}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-10 font-medium">No appointments scheduled today.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Inventory Alerts */}
          <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] shadow-sm">
            <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-600 animate-pulse" /> Inventory Alerts
            </h4>
            <div className="space-y-3">
              <InventoryItem med="Amoxicillin 500mg" stock="0 left" />
              <InventoryItem med="Paracetamol Syrup" stock="Low: 2 units" />
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Activity size={18} className="text-primary" /> Daily Analytics
            </h4>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div><p className="text-[10px] text-slate-400 font-bold uppercase">Efficiency</p><p className="text-2xl font-bold">94%</p></div>
              <div><p className="text-[10px] text-slate-400 font-bold uppercase">Avg. Time</p><p className="text-2xl font-bold">12m</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENT DETAIL POPUP */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-slate-900">Details</h3>
              <button onClick={() => setSelectedAppt(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-8 text-slate-700 font-medium">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Patient</p>
                <p className="text-lg font-bold">{selectedAppt.patientId?.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Time Slot</p>
                  <p className="font-bold">{selectedAppt.slotTime}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Status</p>
                  <p className="font-bold text-primary capitalize">{selectedAppt.status}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => handleStatusUpdate(selectedAppt._id, 'confirmed')} className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
                <Check size={18} /> Confirm Appointment
              </button>
              <button onClick={() => setView("prescription")} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition-all cursor-pointer">
                <CheckCircle size={18} /> Write Prescription
              </button>
              <button onClick={() => handleStatusUpdate(selectedAppt._id, 'cancelled')} className="w-full bg-rose-50 text-rose-500 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-all cursor-pointer">
                <Ban size={18} /> Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

const DocumentRow = ({ name, file, date }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-red-50 text-red-500 rounded-xl"><FileText size={20} /></div>
      <div><p className="text-sm font-bold text-slate-800">{file}</p><p className="text-[10px] text-slate-500 font-medium">{name} • {date}</p></div>
    </div>
    <button className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><Download size={18} /></button>
  </div>
);

const InventoryItem = ({ med, stock }) => (
  <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-amber-200/50">
    <span className="text-xs font-bold text-amber-900">{med}</span>
    <span className="text-[10px] font-black text-amber-600 uppercase">{stock}</span>
  </div>
);

const QueueItem = ({ name, time, status, active }) => (
  <div className={`flex items-center justify-between p-5 rounded-3xl transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${active ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
        {name[0]}
      </div>
      <div>
        <p className={`font-bold ${active ? 'text-white' : 'text-slate-800'}`}>{name}</p>
        <p className={`text-[10px] font-medium ${active ? 'text-white/70' : 'text-slate-400'}`}>{time}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${active ? 'bg-white/20 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
        {status}
      </span>
      {!active && <ChevronRight size={18} />}
    </div>
  </div>
);

export default DoctorDashboard;