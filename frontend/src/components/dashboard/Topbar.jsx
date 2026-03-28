import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, UserCircle, LogOut, Settings, ChevronDown } from "lucide-react";

const Topbar = ({ setSidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-8 flex justify-between items-center">
      
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(prev => !prev)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
          <Menu size={24} />
        </button>
        <div className="hidden md:block">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer group">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-bold">3</span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-200">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
               <UserCircle size={24} />
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-[1.5rem] border border-slate-100 p-2 animate-in fade-in zoom-in duration-200">
              <button onClick={() => navigate("/profile")} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                <Settings size={18} className="text-slate-400" /> Account Settings
              </button>
              <div className="h-px bg-slate-50 my-1" />
              <button onClick={() => { localStorage.clear(); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;