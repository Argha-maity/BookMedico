import React, { useState } from "react";
import { Plus, Trash2, Save, FileText, ArrowLeft } from "lucide-react";

const PrescriptionPad = ({ appointment, onBack, onSave }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeRow = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      appointmentId: appointment._id,
      patientId: appointment.patientId?._id || appointment.patientId, 
      diagnosis, 
      medicines, 
      advice 
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-10 pb-6 border-b">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={20}/></button>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><FileText className="text-primary"/> Digital Prescription</h2>
        </div>
        <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Patient</p>
            <p className="font-bold text-slate-800">{appointment.patientId?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-2">Final Diagnosis</label>
          <input 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
            placeholder="e.g. Viral Fever, Hypertension"
            value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required
          />
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2 block">Medicines & Dosage</label>
          {medicines.map((med, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-[1.5rem] relative group">
              <input placeholder="Medicine Name" className="bg-white p-3 rounded-xl border-none outline-none text-sm font-bold md:col-span-2" value={med.name} onChange={(e) => handleInputChange(idx, "name", e.target.value)} />
              <input placeholder="Dosage (1-0-1)" className="bg-white p-3 rounded-xl border-none outline-none text-sm font-bold" value={med.dosage} onChange={(e) => handleInputChange(idx, "dosage", e.target.value)} />
              <div className="flex gap-2">
                <input placeholder="5 Days" className="bg-white p-3 rounded-xl border-none outline-none text-sm font-bold flex-1" value={med.duration} onChange={(e) => handleInputChange(idx, "duration", e.target.value)} />
                {medicines.length > 1 && (
                  <button type="button" onClick={() => removeRow(idx)} className="text-rose-400 hover:text-rose-600 transition-colors"><Trash2 size={18}/></button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={addMedicineRow} className="flex items-center gap-2 text-primary font-bold text-xs bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all">
            <Plus size={14}/> Add Medicine
          </button>
        </div>

        <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-2">General Advice</label>
            <textarea className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 h-32 font-medium" placeholder="Take rest, avoid cold water..." value={advice} onChange={(e) => setAdvice(e.target.value)} />
        </div>

        <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all">
          <Save size={20}/> Save & Send Prescription
        </button>
      </form>
    </div>
  );
};

export default PrescriptionPad;