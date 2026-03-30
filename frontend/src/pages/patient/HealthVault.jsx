import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyPrescriptions } from "../../services/prescriptionService";
import { 
  FileText, Upload, Plus, Search, FileCheck, 
  Trash2, Eye, Download, X, Pill, MapPin, Calendar
} from "lucide-react";

const HealthVault = () => {
  const [showUpload, setShowUpload] = useState(false); // Controls the Upload Popup
  const [activeTab, setActiveTab] = useState("all"); 
  const [records, setRecords] = useState([]); 
  const [selectedPrescription, setSelectedPrescription] = useState(null); 

  useEffect(() => {
    const loadVault = async () => {
      try {
        const res = await getMyPrescriptions();
        setRecords(res?.prescriptions || []);
      } catch (err) {
        console.error("Error loading vault:", err);
      }
    };
    loadVault();
  }, []);

  const filteredRecords = records.filter(rec => {
    if (activeTab === "prescriptions") return rec.medicines;
    if (activeTab === "reports") return !rec.medicines;
    return true;
  });

  return (
    <DashboardLayout role="patient">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Health Vault</h2>
          <p className="text-slate-500 font-medium">Securely store and manage all your medical records.</p>
        </div>
        {/* FIXED BUTTON: Toggle state to true */}
        <button 
          onClick={() => setShowUpload(true)}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer"
        >
          <Upload size={20} /> Upload Document
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 flex gap-4 overflow-x-auto pb-2">
            <TabBtn active={activeTab === "all"} label="All Records" count={records.length} onClick={() => setActiveTab("all")} />
            <TabBtn active={activeTab === "prescriptions"} label="Prescriptions" count={records.filter(r => r.medicines).length} onClick={() => setActiveTab("prescriptions")} />
            <TabBtn active={activeTab === "reports"} label="Lab Reports" count={0} onClick={() => setActiveTab("reports")} />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search records..." className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 shadow-sm font-medium" />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid gap-4">
        {filteredRecords.map((rec) => (
            <DocumentItem 
                key={rec._id}
                title={rec.medicines ? "Digital Prescription" : rec.title} 
                type={rec.type === "doctor" ? "Prescription" : "Uploaded File"} 
                date={new Date(rec.date).toLocaleDateString()} 
                doctor={rec.doctorId?.name || "Self Uploaded"} 
                isDigital={!!rec.medicines}
                onView={() => rec.medicines ? setSelectedPrescription(rec) : null}
            />
        ))}
      </div>

      {/* 1. VIEW PRESCRIPTION MODAL */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black text-slate-900 mt-2">Prescription</h3>
                    <button onClick={() => setSelectedPrescription(null)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200"><X size={20}/></button>
                </div>
                {/* Medicines List here... */}
                <div className="space-y-3 mb-8">
                    {selectedPrescription.medicines.map((med, i) => (
                        <div key={i} className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                            <p className="font-bold">{med.name}</p>
                            <p className="text-xs font-bold text-slate-500">{med.dosage} ({med.duration})</p>
                        </div>
                    ))}
                </div>
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Download PDF</button>
            </div>
        </div>
      )}

      {/* 2. UPLOAD DOCUMENT MODAL (The one that was missing) */}
      {showUpload && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Upload Record</h3>
              <button onClick={() => setShowUpload(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100"><X size={20}/></button>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Document Title</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700" placeholder="e.g. MRI Scan Brain" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Type</label>
                    <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-700">
                        <option>Lab Report</option>
                        <option>Prescription</option>
                        <option>Vaccination Card</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Date</label>
                    <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-700" />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center hover:border-primary/50 transition-all group cursor-pointer relative">
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="text-primary" size={24}/>
                </div>
                <p className="text-sm font-bold text-slate-700">Click to upload or drag & drop</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">PDF, JPG or PNG (Max 5MB)</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>

              <button type="button" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                Save to Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Reusable Sub-components (DocumentItem, TabBtn) go here...
const DocumentItem = ({ title, type, date, doctor, isDigital, onView }) => (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:shadow-xl transition-all">
        <div className="flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${isDigital ? 'bg-primary/10 text-primary' : 'bg-blue-50 text-blue-500'}`}>
                {isDigital ? <FileCheck size={24}/> : <FileText size={24}/>}
            </div>
            <div>
                <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{title}</h4>
                <p className="text-[10px] font-black uppercase text-slate-400">{type} • {date}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button onClick={onView} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-all cursor-pointer"><Eye size={18}/></button>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-all cursor-pointer"><Download size={18}/></button>
        </div>
    </div>
);

const TabBtn = ({ active, label, count, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all cursor-pointer ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border border-slate-100'}`}>
      {label} <span className={`text-[10px] px-2 py-0.5 rounded-lg ${active ? 'bg-white/20' : 'bg-slate-100'}`}>{count}</span>
    </button>
);

export default HealthVault;