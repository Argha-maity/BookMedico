import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Users, Search, ArrowLeft, ShieldCheck, 
  UserMinus, Mail, Clock, Calendar, Filter 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/auth"; 

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, patient, doctor

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers(); 
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout role="admin">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h2>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 shadow-sm font-medium" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {['all', 'patient', 'doctor'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-xl font-bold text-sm capitalize transition-all ${
                filter === type ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {type}s
            </button>
          ))}
        </div>
      </div>

      {/* Users Table/Grid */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 hover:shadow-lg transition-all">
            
            {/* User Info */}
            <div className="flex items-center gap-5 w-full lg:w-1/3">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-primary text-xl border border-slate-100">
                {user.name[0]}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{user.name}</h4>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Mail size={12}/> {user.email}
                </p>
              </div>
            </div>

            {/* Role & Signup Status */}
            <div className="flex items-center justify-around w-full lg:w-2/3">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role</p>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                  user.role === 'doctor' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Joined On</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1 justify-center">
                  <Calendar size={14} className="text-slate-300"/> 
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Activity</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1 justify-center">
                  <Clock size={14} className="text-slate-300"/> 
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <div className="flex gap-2">
                <button title="Restrict Access" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer">
                  <UserMinus size={18}/>
                </button>
                <button title="Verify Account" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer">
                  <ShieldCheck size={18}/>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;