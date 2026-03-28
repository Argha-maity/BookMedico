import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, Store, X, Calendar,
  FileText, Users, CreditCard, ClipboardList, LogOut
} from "lucide-react";

const Sidebar = ({ role, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuConfig = {
    patient: [
      { name: "Dashboard", path: "/patient-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Health Vault", path: "/health-vault", icon: <FileText size={20} /> },
      { name: "Membership", path: "/membership", icon: <CreditCard size={20} /> },
    ],
    doctor: [
      { name: "Dashboard", path: "/doctor-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Doctor CV", path: "/doctor-cv", icon: <ClipboardList size={20} /> },
      { name: "Nearby Stores", path: "/medical-stores", icon: <Store size={20} /> },
      { name: "Schedule", path: "/calendar", icon: <Calendar size={20} /> },
    ],
    admin: [
      { name: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Calendar", path: "/calendar", icon: <Calendar size={20} /> },
      { name: "Store Settings", path: "/store-settings", icon: <Store size={20} /> },
      { name: "App Usage", path: "/admin/users", icon: <Users size={20} /> },
    ],
  };

  const currentMenu = menuConfig[role] || [];

  return (
    <>
      {/* Mobile Backdrop */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-100 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        <div className="p-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-primary font-black text-xl tracking-tight">
            <div className="border-2 border-primary rounded-lg p-1 text-sm">🩺</div>
            <span>BookMedico</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-primary"><X size={20} /></button>
        </div>

        {/* This flex container pushes the bottom links down */}
        <nav className="px-6 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-3">Main Menu</p>
            {currentMenu.map((item, idx) => (
              <Link key={idx} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${location.pathname === item.path ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-500 hover:bg-slate-50 hover:text-primary"}`}>
                {item.icon} <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto mb-6 flex flex-col gap-1">
            <div className="h-px bg-slate-50 my-4 mx-4" />
            <Link to="/profile" onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${location.pathname === "/profile" ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50"}`}>
              <User size={20} /> <span className="text-sm">My Profile</span>
            </Link>
            
            <button onClick={() => { localStorage.clear(); window.location.href = "/"; }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 transition-all cursor-pointer">
              <LogOut size={20} /> <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;