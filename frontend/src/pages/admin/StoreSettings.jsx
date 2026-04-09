import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Store, MapPin, Clock, ShieldCheck, 
  Save, Bell, Globe, Camera, Phone, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoreSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("general");

  // State for store details
  const [storeData, setStoreData] = useState({
    storeName: "City Medico & Wellness",
    licenseNumber: "DL-12345/2026",
    address: "123 Main Street, Sector V, Salt Lake",
    city: "Kolkata",
    phone: "+91 9876543210",
    email: "contact@citymedico.com",
    openTime: "09:00",
    closeTime: "22:00",
    deliveryRadius: "5",
    is24x7: false
  });

  const handleUpdate = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Store Settings</h2>
        <p className="text-slate-500 font-medium">Configure your pharmacy's public profile and operations.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <NavBtn active={activeSection === "general"} icon={<Store size={18}/>} label="General Info" onClick={() => setActiveSection("general")} />
          <NavBtn active={activeSection === "timing"} icon={<Clock size={18}/>} label="Operating Hours" onClick={() => setActiveSection("timing")} />
          <NavBtn active={activeSection === "security"} icon={<ShieldCheck size={18}/>} label="License & Security" onClick={() => setActiveSection("security")} />
          <NavBtn active={activeSection === "notifications"} icon={<Bell size={18}/>} label="Notifications" onClick={() => setActiveSection("notifications")} />
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            
            {activeSection === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-6 mb-10 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100 relative group cursor-pointer">
                    <Store size={32} />
                    <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <Camera className="text-white" size={20}/>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Store Logo</h4>
                    <p className="text-xs text-slate-400 font-medium">PNG or JPG, max 2MB. This appears on prescriptions.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup label="Store Display Name" name="storeName" value={storeData.storeName} onChange={handleUpdate} icon={<Store size={16}/>}/>
                  <InputGroup label="Public Contact Number" name="phone" value={storeData.phone} onChange={handleUpdate} icon={<Phone size={16}/>}/>
                  <InputGroup label="Store Email" name="email" value={storeData.email} onChange={handleUpdate} icon={<Globe size={16}/>}/>
                  <InputGroup label="Delivery Radius (KM)" name="deliveryRadius" value={storeData.deliveryRadius} onChange={handleUpdate} type="number" icon={<MapPin size={16}/>}/>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">Full Address</label>
                  <textarea 
                    name="address"
                    value={storeData.address}
                    onChange={handleUpdate}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700 h-24"
                  />
                </div>
              </div>
            )}

            {activeSection === "timing" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-start gap-4 mb-6">
                  <Info className="text-emerald-600 mt-1" size={20}/>
                  <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                    Patients will only be able to book appointments and order medicines within these hours. 
                    Enabling 24/7 will bypass timing checks.
                  </p>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                  <div>
                    <h4 className="font-bold text-slate-800">24/7 Operations</h4>
                    <p className="text-xs text-slate-400 font-medium">Is your pharmacy always open?</p>
                  </div>
                  <button 
                    onClick={() => setStoreData({...storeData, is24x7: !storeData.is24x7})}
                    className={`w-14 h-8 rounded-full transition-all relative ${storeData.is24x7 ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${storeData.is24x7 ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                {!storeData.is24x7 && (
                  <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Opening Time" name="openTime" value={storeData.openTime} onChange={handleUpdate} type="time" icon={<Clock size={16}/>}/>
                    <InputGroup label="Closing Time" name="closeTime" value={storeData.closeTime} onChange={handleUpdate} type="time" icon={<Clock size={16}/>}/>
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
              <button className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                <Save size={20} /> Save Configuration
              </button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

const NavBtn = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all cursor-pointer ${
      active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 hover:bg-slate-50'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const InputGroup = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-2">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">{icon}</div>
      <input 
        className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700 transition-all"
        {...props}
      />
    </div>
  </div>
);

export default StoreSettings;