import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { 
  FileText, Upload, ShieldCheck, CheckCircle, 
  AlertCircle, X, FilePlus, Info, Save 
} from "lucide-react";

const DoctorCredentials = () => {
  const [files, setFiles] = useState({
    cv: null,
    license: null,
    degree: null,
  });

  const [status, setStatus] = useState("pending"); // pending, submitted, verified

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles({ ...files, [type]: selectedFile });
    }
  };

  const removeFile = (type) => {
    setFiles({ ...files, [type]: null });
  };

  return (
    <DashboardLayout role="doctor">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Professional Verification</h2>
          <p className="text-slate-500 font-medium">Upload your credentials to maintain your verified status.</p>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest ${
          status === "verified" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
        }`}>
          {status === "verified" ? <ShieldCheck size={16}/> : <AlertCircle size={16}/>}
          Status: {status}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <FilePlus className="text-primary" size={22} /> Document Uploads
            </h3>

            <div className="space-y-6">
              <UploadSlot 
                label="Updated Resume / CV" 
                description="PDF format preferred (Max 5MB)"
                file={files.cv}
                onUpload={(e) => handleFileChange(e, "cv")}
                onRemove={() => removeFile("cv")}
              />
              <UploadSlot 
                label="Medical Practice License" 
                description="Clear scan of your current regulatory license"
                file={files.license}
                onUpload={(e) => handleFileChange(e, "license")}
                onRemove={() => removeFile("license")}
              />
              <UploadSlot 
                label="MBBS / MD Degree Certificate" 
                description="Final degree or provisional certificate"
                file={files.degree}
                onUpload={(e) => handleFileChange(e, "degree")}
                onRemove={() => removeFile("degree")}
              />
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex justify-end">
              <button 
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                disabled={!files.cv || !files.license || !files.degree}
              >
                <Save size={20} /> Submit for Verification
              </button>
            </div>
          </div>
        </div>

        {/* Requirements & Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info size={18} className="text-primary" /> Guidelines
            </h4>
            <ul className="space-y-4 text-xs text-slate-400 font-medium leading-relaxed">
              <li className="flex gap-3">
                <CheckCircle size={16} className="text-primary shrink-0" />
                Documents must be clearly legible and not expired.
              </li>
              <li className="flex gap-3">
                <CheckCircle size={16} className="text-primary shrink-0" />
                Accepted formats: PDF, JPEG, or PNG.
              </li>
              <li className="flex gap-3">
                <CheckCircle size={16} className="text-primary shrink-0" />
                Verification usually takes 24-48 business hours.
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
            <p className="text-xs text-blue-700 leading-relaxed mb-4">
              If you're having trouble uploading, contact our credentialing team at:
            </p>
            <p className="text-sm font-black text-blue-900">support@mediconnect.com</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// --- Upload Component ---

const UploadSlot = ({ label, description, file, onUpload, onRemove }) => (
  <div className="group">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
      {label}
    </label>
    
    <div className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all ${
      file 
      ? 'border-emerald-200 bg-emerald-50/30' 
      : 'border-slate-100 hover:border-primary/40 bg-slate-50/50'
    }`}>
      {file ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl text-emerald-500 shadow-sm">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{file.name}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase">Ready to upload</p>
            </div>
          </div>
          <button 
            onClick={onRemove}
            className="p-2 bg-white text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <Upload className="text-slate-300 mb-2 group-hover:text-primary transition-colors" size={24} />
          <p className="text-sm font-bold text-slate-700">Click to browse</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{description}</p>
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={onUpload}
          />
        </div>
      )}
    </div>
  </div>
);

export default DoctorCredentials;