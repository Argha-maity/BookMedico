import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Users, Search, ArrowLeft, Filter, 
  Mail, Phone, Calendar, ChevronRight, 
  MoreVertical, UserCheck, Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios"; // Adjust based on your service structure

const PatientsList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Fetch users where role is 'patient'
        const res = await API.get("/admin/users?role=patient");
        setPatients(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Total Patients</h2>
            <p className="text-slate-500 font-medium">Manage and review all registered patient profiles.</p>
          </div>
        </div>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer shadow-xl shadow-slate-200">
          <Download size={18} /> Export List
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search patients by name, email or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-primary/10 shadow-sm font-medium transition-all"
          />
        </div>
        <button className="bg-white border border-slate-100 p-4 rounded-[1.5rem] text-slate-500 hover:text-primary transition-all shadow-sm flex items-center gap-2 font-bold px-6">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Patients Table Wrapper */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Patient Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg border border-primary/5">
                          {patient.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{patient.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">ID: #{patient._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                          <Mail size={14} className="text-slate-300" /> {patient.email}
                        </p>
                        <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                          <Phone size={14} className="text-slate-300" /> {patient.phone || "---"}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <p className="text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        <UserCheck size={12} /> Active
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </button>
                        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="text-slate-200 mb-4" size={48} />
                      <p className="text-slate-400 font-bold">No patients found in the record.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientsList;