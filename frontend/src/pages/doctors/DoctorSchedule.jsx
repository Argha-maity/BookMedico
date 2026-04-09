import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDoctorAppointments } from "../../services/appointmentService";
import { 
  Clock, User, ChevronRight, Calendar as CalIcon, 
  CheckCircle, AlertCircle, Filter, Search, MoreVertical
} from "lucide-react";

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // all, confirmed, completed
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getDoctorAppointments();
        setAppointments(res?.appointments || []);
      } catch (err) { console.error(err); }
    };
    loadData();
  }, []);

  const filteredAppointments = appointments.filter(appt => 
    filter === "all" ? true : appt.status === filter
  );

  return (
    <DashboardLayout role="doctor">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Daily Agenda</h2>
          <p className="text-slate-500 font-medium">Manage your consultations and patient flow.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            All Slots
          </button>
          <button 
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === 'confirmed' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Upcoming
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* MAIN TIMELINE COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Clock className="text-primary" size={20}/> Active Timeline
              </h3>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-3 py-1 rounded-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div className="relative space-y-1">
              {/* The Timeline Vertical Line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt, index) => (
                  <TimelineItem 
                    key={appt._id}
                    time={appt.slotTime}
                    patient={appt.patientId?.name}
                    status={appt.status}
                    isLast={index === filteredAppointments.length - 1}
                  />
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-400 font-bold">No appointments for this selection.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR: MINI CALENDAR & STATS */}
        <div className="space-y-8">
          {/* Quick Stats Summary */}
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CalIcon size={18} className="text-primary" /> Today's Load
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Total</p>
                  <p className="text-2xl font-black">{appointments.length}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Remaining</p>
                  <p className="text-2xl font-black text-primary">
                    {appointments.filter(a => a.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* Efficiency Tips */}
          <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-emerald-600" /> Duty Notice
            </h4>
            <ul className="space-y-3 text-xs text-emerald-700 font-medium">
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></span>
                Emergency ward rounds at 04:00 PM.
              </li>
              <li className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></span>
                Ensure all digital prescriptions are signed before 08:00 PM.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

const TimelineItem = ({ time, patient, status, isLast }) => {
  const isCompleted = status === 'completed';

  return (
    <div className={`relative pl-12 ${isLast ? '' : 'pb-8'}`}>
      {/* Timeline Indicator */}
      <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 transition-colors ${
        isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
      }`}>
        {isCompleted ? <CheckCircle size={14} /> : <Clock size={14} />}
      </div>

      <div className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${
        isCompleted ? 'bg-slate-50 border-transparent opacity-60' : 'bg-white border-slate-100 hover:border-primary/30 hover:shadow-lg'
      }`}>
        <div className="flex items-center gap-5">
          <div className="text-center min-w-[60px]">
            <p className="text-xs font-black text-slate-900 leading-none">{time.split(' ')[0]}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{time.split(' ')[1]}</p>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div>
            <h4 className={`font-bold text-lg ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
              {patient}
            </h4>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
              {isCompleted ? 'Consultation Finished' : 'Routine Checkup'}
            </p>
          </div>
        </div>

        <button className={`p-3 rounded-xl transition-all ${
          isCompleted ? 'text-slate-300' : 'bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white'
        }`}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DoctorSchedule;