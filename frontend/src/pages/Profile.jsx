import React, { useEffect, useState } from "react";
import { getProfile } from "../services/auth";
import { 
  User as UserIcon, Mail, Phone, MapPin, 
  Calendar, Camera, Edit3, Save, X 
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) { console.error(err); }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-8">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-teal-500/20" />
        
        <div className="px-10 pb-10 -mt-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl">
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full rounded-[1.2rem] object-cover" />
                ) : (
                  <div className="w-full h-full rounded-[1.2rem] bg-slate-100 flex items-center justify-center text-slate-400">
                    <UserIcon size={48} />
                  </div>
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-all cursor-pointer">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1 mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold text-slate-900">{user.name}</h2>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-widest">
                  {user.role}
                </span>
              </div>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>

            <button 
              onClick={() => setIsEdit(!isEdit)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all cursor-pointer ${
                isEdit ? 'bg-slate-100 text-slate-600' : 'bg-primary text-white shadow-lg shadow-primary/20'
              }`}
            >
              {isEdit ? <><X size={18} /> Cancel</> : <><Edit3 size={18} /> Edit Profile</>}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Contact Info (Point 1) */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">Contact Info</h3>
          
          <InfoItem icon={<Mail size={18} />} label="Email Address" value={user.email} />
          <InfoItem icon={<Phone size={18} />} label="Phone Number" value={user.phone} />
          <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={user.dob ? new Date(user.dob).toLocaleDateString() : "Not Provided"} />
        </div>

        {/* Personal & Address Details (Point 2) */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4 mb-6">Personal Details</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <DetailField label="Gender" value={user.gender} isEdit={isEdit} type="select" options={["Male", "Female", "Other"]} />
            <DetailField label="City" value={user.city} isEdit={isEdit} />
            <DetailField label="State" value={user.state} isEdit={isEdit} />
            <DetailField label="Address Line 1" value={user.address?.line1} isEdit={isEdit} />
            <DetailField label="Address Line 2" value={user.address?.line2} isEdit={isEdit} />
          </div>

          {isEdit && (
            <div className="mt-12 flex justify-end">
              <button className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                <Save size={20} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for cleaner structure ---

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-slate-50 text-primary rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value || "---"}</p>
    </div>
  </div>
);

const DetailField = ({ label, value, isEdit, type = "text", options }) => (
  <div className="space-y-2">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</p>
    {isEdit ? (
      type === "select" ? (
        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary">
          {options.map(opt => <option key={opt} selected={opt === value}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary transition-all font-medium text-slate-700" 
        />
      )
    ) : (
      <div className="p-3 bg-transparent border border-transparent font-bold text-slate-800">
        {value || <span className="text-slate-300 font-normal italic">Not specified</span>}
      </div>
    )}
  </div>
);

export default Profile;