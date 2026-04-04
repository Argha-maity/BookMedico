import React, { useEffect, useState } from "react";
import { getProfile } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { 
  User as UserIcon, Mail, Phone, MapPin, 
  Calendar, Camera, Edit3, Save, X, ArrowLeft,
  Stethoscope, GraduationCap, Briefcase, Award
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
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

  const isDoctor = user.role === "doctor";

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      
      {/* Back Button */}
      <div className="mb-6 flex justify-start">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-2xl font-bold shadow-sm hover:shadow-md hover:border-primary/20 hover:text-primary transition-all cursor-pointer"
        >
          <div className="p-1.5 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm">Back to Dashboard</span>
        </button>
      </div>
      
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
                <h2 className="text-3xl font-extrabold text-slate-900">{isDoctor ? `Dr. ${user.name}` : user.name}</h2>
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

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">Contact Info</h3>
            <InfoItem icon={<Mail size={18} />} label="Email Address" value={user.email} />
            <InfoItem icon={<Phone size={18} />} label="Phone Number" value={user.phone} />
            <InfoItem icon={<Calendar size={18} />} label="Registered Date" value={new Date(user.createdAt).toLocaleDateString()} />
          </div>

          {/* DOCTOR SPECIFIC CARD (NEW) */}
          {isDoctor && (
            <div className="bg-primary text-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/20 space-y-6 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-4">Professional Profile</h3>
                  <div className="space-y-5">
                    <DoctorInfoItem icon={<Stethoscope size={18}/>} label="Speciality" value={user.speciality} />
                    <DoctorInfoItem icon={<GraduationCap size={18}/>} label="Degree" value={user.degree} />
                    <DoctorInfoItem icon={<Briefcase size={18}/>} label="Experience" value={`${user.experience} Years`} />
                  </div>
               </div>
               <Award className="absolute -right-4 -bottom-4 opacity-10" size={120} />
            </div>
          )}
        </div>

        {/* Personal Details & Editable Fields */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4 mb-6">Personal & Address Details</h3>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <DetailField label="City" value={user.city} isEdit={isEdit} name="city" />
            <DetailField label="State" value={user.state} isEdit={isEdit} name="state" />
            <DetailField label="Address Line 1" value={user.address?.line1} isEdit={isEdit} name="addressLine1" />
            <DetailField label="Gender" value={user.gender} isEdit={isEdit} type="select" options={["Male", "Female", "Other"]} name="gender" />
            
            {/* Show Doctor fields in edit mode if user is doctor */}
            {isDoctor && isEdit && (
              <>
                <DetailField label="Speciality" value={user.speciality} isEdit={isEdit} name="speciality" />
                <DetailField label="Degree" value={user.degree} isEdit={isEdit} name="degree" />
                <DetailField label="Experience (Years)" value={user.experience} isEdit={isEdit} type="number" name="experience" />
              </>
            )}
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

// --- Sub-components ---

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-slate-50 text-primary rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value || "---"}</p>
    </div>
  </div>
);

const DoctorInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-white/10 text-white rounded-xl border border-white/10">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-white">{value || "---"}</p>
    </div>
  </div>
);

const DetailField = ({ label, value, isEdit, type = "text", options, name }) => (
  <div className="space-y-2">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</p>
    {isEdit ? (
      type === "select" ? (
        <select 
          name={name}
          defaultValue={value} // React handles the selection automatically here
          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700 cursor-pointer"
        >
          <option value="" disabled>Select {label}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input 
          name={name}
          type={type} 
          defaultValue={value} 
          className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700" 
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