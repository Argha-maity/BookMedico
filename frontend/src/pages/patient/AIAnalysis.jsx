import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  Sparkles, Upload, Zap, BrainCircuit, 
  ShieldCheck, MessageSquare, History, ArrowRight,
  FileText, Activity, AlertCircle, X
} from "lucide-react";

const AIAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI Processing Delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <DashboardLayout role="patient">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest flex items-center gap-1">
              <Sparkles size={12}/> Powered by Medi-AI 3.5
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Health Insights</h2>
          <p className="text-slate-500 font-medium">Upload reports or describe symptoms for an instant intelligent analysis.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Analysis Input Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnalysisTypeCard 
              title="Analyze Prescription" 
              desc="Extract medicine info and dosage schedule from photos."
              icon={<FileText size={24}/>}
              color="bg-primary"
            />
            <AnalysisTypeCard 
              title="Symptom Checker" 
              desc="Describe how you feel for a preliminary health check."
              icon={<Activity size={24}/>}
              color="bg-slate-900"
            />
          </div>

          {/* Upload/Input Zone */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Start New Analysis</h3>
              
              <div className="border-2 border-dashed border-slate-100 rounded-[2.5rem] p-12 text-center hover:border-primary/40 transition-all group cursor-pointer bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="text-primary" size={28}/>
                </div>
                <p className="text-lg font-bold text-slate-700">Drop your report here</p>
                <p className="text-sm text-slate-400 font-medium mt-1">Supports PDF, JPG, PNG (Max 10MB)</p>
                <input type="file" className="hidden" />
              </div>

              <div className="mt-8 flex items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl"><BrainCircuit className="text-primary"/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Model</p>
                    <p className="text-sm font-bold">Clinical-Language-Model (v2)</p>
                  </div>
                </div>
                <button 
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? "Analyzing..." : "Begin AI Scan"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Tips & History */}
        <div className="space-y-8">
          <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2.5rem]">
            <h4 className="font-black text-primary text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck size={18}/> Accuracy Notice
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Medi-AI analysis is for **informational purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with your doctor.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <History size={18} className="text-slate-400"/> Recent Scans
              </h4>
            </div>
            <div className="space-y-4">
              <RecentScanItem title="Blood Report" date="2 hours ago" status="Critical" />
              <RecentScanItem title="Chest X-Ray" date="Yesterday" status="Normal" />
            </div>
          </div>
        </div>
      </div>

      {/* ANALYSIS RESULT MODAL */}
      {showResult && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30">
                  <Sparkles size={24}/>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">AI Findings</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase">Confidence Score: 98%</p>
                </div>
              </div>
              <button onClick={() => setShowResult(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X size={20}/></button>
            </div>

            <div className="space-y-6 mb-10 text-slate-700">
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Executive Summary</h5>
                <p className="text-sm font-medium leading-relaxed italic">
                  "The uploaded report indicates elevated levels of LDL Cholesterol. While not immediate, lifestyle changes and consultation with a Cardiologist are recommended."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100">
                  <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Alert</p>
                  <p className="text-sm font-bold text-rose-700">High Lipid Count</p>
                </div>
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Recommendation</p>
                  <p className="text-sm font-bold text-emerald-700">Low Sodium Diet</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
               Book Specialist Consultation <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// --- Sub-components ---

const AnalysisTypeCard = ({ title, desc, icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group">
    <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h4 className="text-xl font-black text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const RecentScanItem = ({ title, date, status }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg"><FileText size={16} className="text-slate-400"/></div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{date}</p>
      </div>
    </div>
    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${
      status === 'Critical' ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'
    }`}>{status}</span>
  </div>
);

export default AIAnalysis;