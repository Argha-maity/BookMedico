import React from "react";
import { Phone, Calendar, Star, GraduationCap, MapPin, ChevronRight } from "lucide-react";

const DoctorCard = ({ doctor, role, onBook }) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Subtle Background Glow on Hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Enhanced Avatar with Status Ring */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/10 flex items-center justify-center font-black text-primary text-xl shadow-inner">
              {doctor.name.split(' ')[1]?.[0] || doctor.name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">
              {doctor.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                {doctor.specialization || doctor.specialty}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-black text-amber-700">4.9</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
            <GraduationCap size={14} />
          </div>
          <p className="text-xs font-semibold">
            <span className="text-slate-900">{doctor.experience} Years</span> Experience
          </p>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
            <MapPin size={14} />
          </div>
          <p className="text-xs font-medium truncate">
            {doctor.hospital || "Apex Medical Center"}
          </p>
        </div>
      </div>

      {/* Conditional Action Buttons */}
      <div className="relative z-10">
        {role === "patient" && (
          <button
            onClick={onBook}
            className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar size={18} />
            <span>Book Appointment</span>
            <ChevronRight size={16} className="ml-1 opacity-50" />
          </button>
        )}

        {role === "admin" && (
          <div className="flex gap-2">
            <button className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all cursor-pointer">
              <Phone size={14} /> Contact
            </button>
            <button className="px-4 py-3 border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;