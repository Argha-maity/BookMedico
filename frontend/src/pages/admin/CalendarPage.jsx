import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  ChevronLeft, ChevronRight, Clock, 
  User, Calendar as CalIcon, Plus, Filter, MoreHorizontal 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper to generate days for the current month view
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Schedule Master</h2>
          <p className="text-slate-500 font-medium">Manage appointments and clinical availability.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all cursor-pointer">
          <Plus size={20} /> New Blockout
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* LEFT: CALENDAR GRID */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 px-4">
            <h3 className="text-xl font-black text-slate-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all border border-slate-100"><ChevronLeft size={20}/></button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all border border-slate-100"><ChevronRight size={20}/></button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="text-center text-[10px] font-black uppercase text-slate-400 tracking-widest py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Padding for first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`pad-${i}`} className="h-24 md:h-32 bg-slate-50/50 rounded-2xl border border-transparent" />
            ))}
            
            {days.map(day => {
              const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
              const hasAppointments = day % 3 === 0; // Mock logic for dots

              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`h-24 md:h-32 p-3 rounded-3xl border transition-all cursor-pointer relative group ${
                    isSelected 
                    ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                    : 'bg-white border-slate-100 hover:border-primary/30 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-slate-800'}`}>{day}</span>
                  
                  {/* Appointment Dots */}
                  {!isSelected && hasAppointments && (
                    <div className="mt-2 flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    </div>
                  )}

                  {/* Desktop Quick View */}
                  <div className={`hidden md:block mt-2 text-[9px] font-bold leading-tight ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {hasAppointments ? "3 Appointments" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: DAY DETAILS SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 text-primary rounded-2xl">
                <CalIcon size={20}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Schedule for</p>
                <h4 className="text-lg font-bold">{selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}</h4>
              </div>
            </div>

            <div className="space-y-4">
              <ScheduleTimelineItem time="09:30 AM" patient="Rahul Sharma" doctor="Dr. Argha" />
              <ScheduleTimelineItem time="11:00 AM" patient="Anita Singh" doctor="Dr. Priyanka" />
              <ScheduleTimelineItem time="02:30 PM" patient="Sunil Gupta" doctor="Dr. Argha" status="Break" />
            </div>

            <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-all border border-white/5">
              Generate Daily Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
             <h5 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <Filter size={14} className="text-primary"/> Quick Filter
             </h5>
             <div className="space-y-2">
                <FilterToggle label="All Appointments" active />
                <FilterToggle label="Pending Consultations" />
                <FilterToggle label="Surgery/Operation" />
             </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Sub-components ---

const ScheduleTimelineItem = ({ time, patient, doctor, status }) => (
  <div className="relative pl-6 border-l border-white/10 pb-4 last:pb-0">
    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
    <p className="text-[10px] font-black text-primary uppercase mb-1">{time}</p>
    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
      <p className="text-xs font-bold text-white">{status || patient}</p>
      <p className="text-[10px] text-slate-400 font-medium">with {doctor}</p>
    </div>
  </div>
);

const FilterToggle = ({ label, active }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
    <span className={`text-xs font-bold ${active ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-primary' : 'bg-slate-200'}`}></div>
  </div>
);

export default CalendarPage;