import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getAllAppointments } from "../../services/appointmentService";
import { addMedicineToInventory } from "../../services/inventoryService";
import {
  Users, Stethoscope, Calendar, Package,
  Wallet, FileText, UserPlus, TrendingUp,
  Clock, CheckCircle, AlertCircle, ChevronRight, X, Plus, Database
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  
  // State for Inventory Form
  const [formData, setFormData] = useState({
    name: "",
    category: "Tablets",
    stock: "",
    price: "",
    expiryDate: ""
  });

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await getAllAppointments();
        setAppointments(res?.appointments || res?.data || res || []);
      } catch (err) {
        console.error("Failed to load appointments:", err);
        setAppointments([]);
      }
    };
    loadAppointments();
  }, []);

  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addMedicineToInventory(formData); 
      if (res.success) {
        alert("Inventory updated!");
        setShowInventoryModal(false);
        // Reset form
        setFormData({ name: "", category: "Tablets", stock: "", price: "", expiryDate: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update inventory");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout role="admin">
      {/* Header & Global Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Store Operations</h2>
          <p className="text-slate-500 font-medium">Manage your clinical partners, inventory, and staff.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer">
            <UserPlus size={18} /> Add Worker
          </button>
          <button
            onClick={() => setShowInventoryModal(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Plus size={18} /> Update Inventory
          </button>
        </div>
      </div>

      {/* Finance & Growth Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatWidget title="Total Revenue" value="₹42,500" trend="+12%" icon={<Wallet className="text-emerald-500" />} />
        <div onClick={() => navigate("/admin/doctors")} className="cursor-pointer">
          <StatWidget title="Total Doctors" value="14" trend="Active" icon={<Stethoscope className="text-blue-500" />} />
        </div>
        <StatWidget title="Total Patients" value="1,240" trend="+84" icon={<Users className="text-purple-500" />} />

        <div onClick={() => navigate("/inventory")} className="cursor-pointer group">
          <StatWidget
            title="Inventory Details"
            value="View All"
            trend="Check Stocks"
            icon={<Database className="text-rose-500 group-hover:scale-110 transition-transform" />}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Operational Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* New Doctor Requests */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserPlus className="text-primary" size={22} /> New Doctor Requests
            </h3>
            <div className="space-y-4">
              <DoctorRequestRow name="Dr. Argha Maity" specialty="Neurologist" exp="8 Yrs" />
              <DoctorRequestRow name="Dr. S. Chatterjee" specialty="Pediatrician" exp="5 Yrs" />
            </div>
          </div>

          {/* Master Schedule */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Master Schedule</h3>
              <div className="flex gap-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">Today</span>
              </div>
            </div>
            <div className="space-y-3">
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt._id} onClick={() => setSelectedAppt(appt)} className="cursor-pointer">
                    <ScheduleItem
                      patient={appt.patientId?.name || "Patient"}
                      doctor={appt.doctorId?.name || "Doctor"}
                      time={appt.slotTime}
                      status={appt.paymentStatus === "Paid" ? "Paid" : "Pending"}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl">
                  <p className="text-sm text-slate-400 font-medium">No appointments scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package size={18} className="text-primary" /> Critical Inventory
            </h4>
            <div className="space-y-4">
              <InventoryMini med="Insulin" stock="02 units" level="low" />
              <InventoryMini med="Metformin" stock="Out of Stock" level="zero" />
            </div>
            <button onClick={() => navigate("/inventory")} className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer">
              Inventory Report
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Staff Directory</h4>
            <div className="space-y-4">
              <WorkerItem name="Tapan Das" role="Pharmacist" status="On Duty" />
              <WorkerItem name="Sima Sen" role="Counter Staff" status="On Duty" />
              <WorkerItem name="Joy Pal" role="Delivery" status="Leave" />
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[2.5rem] p-6 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Wallet size={18} /> Payouts Due
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700 font-medium">Dr. Sharma</span>
                <span className="font-bold text-emerald-900">₹4,200</span>
              </div>
              <div className="flex justify-between text-sm border-t border-emerald-200/50 pt-2">
                <span className="text-emerald-700 font-medium">Staff Salaries</span>
                <span className="font-bold text-emerald-900">₹28,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: UPDATE INVENTORY FORM */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Add to Inventory</h3>
              <button onClick={() => setShowInventoryModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100"><X size={20} /></button>
            </div>

            <form onSubmit={handleInventorySubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Medicine Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-bold" 
                  placeholder="e.g. Paracetamol 500mg" 
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold"
                  >
                    <option value="Tablets">Tablets</option>
                    <option value="Syrups">Syrups</option>
                    <option value="Injections">Injections</option>
                    <option value="Supplements">Supplements</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Stock Count</label>
                  <input 
                    name="stock"
                    type="number" 
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" 
                    placeholder="0" 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Price (per unit)</label>
                  <input 
                    name="price"
                    type="number" 
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" 
                    placeholder="₹" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Expiry Date</label>
                  <input 
                    name="expiryDate"
                    type="date" 
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" 
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95 mt-4">
                Save Medicine
              </button>
            </form>
          </div>
        </div>
      )}

      {/* APPOINTMENT DETAIL POPUP */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Appointment Details</h3>
              <button onClick={() => setSelectedAppt(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <DetailRow label="Patient Name" value={selectedAppt.patientId?.name} />
              <DetailRow label="Consulting Doctor" value={selectedAppt.doctorId?.name} />
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Date" value={selectedAppt.slotDate} />
                <DetailRow label="Time Slot" value={selectedAppt.slotTime} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="App Status" value={selectedAppt.status} color="text-primary" />
                <DetailRow label="Payment" value={selectedAppt.paymentStatus || "Pending"} color="text-emerald-600" />
              </div>
            </div>
            <button onClick={() => setSelectedAppt(null)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg">
              Close Overview
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// ... Subcomponents remain exactly as in your provided code
const StatWidget = ({ title, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
    <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-xl font-bold text-slate-800">{value}</h3>
      <p className={`text-[10px] font-bold mt-1 ${trend.includes('+') ? 'text-emerald-500' : 'text-slate-400'}`}>{trend}</p>
    </div>
  </div>
);

const DoctorRequestRow = ({ name, specialty, exp }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-primary shadow-sm">
        {name[4]}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase">{specialty} • {exp} Exp</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-all cursor-pointer">
        <CheckCircle size={16} />
      </button>
      <button className="bg-white text-slate-400 border border-slate-200 p-2 rounded-lg hover:text-rose-500 hover:border-rose-200 transition-all cursor-pointer">
        <AlertCircle size={16} />
      </button>
    </div>
  </div>
);

const ScheduleItem = ({ patient, doctor, time, status }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border-b border-slate-50 last:border-0">
    <div className="grid grid-cols-3 gap-8 w-full">
      <div className="text-sm font-bold text-slate-800">{patient}</div>
      <div className="text-sm font-medium text-slate-500">{doctor}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">{time}</span>
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
          {status}
        </span>
      </div>
    </div>
  </div>
);

const InventoryMini = ({ med, stock, level }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm font-medium text-slate-300">{med}</span>
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${level === 'zero' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
      {stock}
    </span>
  </div>
);

const WorkerItem = ({ name, role, status }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm font-bold text-slate-800">{name}</p>
      <p className="text-[10px] text-slate-500 font-medium">{role}</p>
    </div>
    <span className={`w-2 h-2 rounded-full ${status === 'On Duty' ? 'bg-emerald-500' : 'bg-slate-300'}`} title={status} />
  </div>
);

const DetailRow = ({ label, value, color = "text-slate-900" }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">{label}</p>
    <p className={`font-bold ${color}`}>{value || "N/A"}</p>
  </div>
);

export default AdminDashboard;