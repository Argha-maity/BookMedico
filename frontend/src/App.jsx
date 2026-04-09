import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));

// Dashboards
const PatientDashboard = lazy(() => import('./pages/dashboards/PatientDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboards/AdminDashboard'));
const DoctorDashboard = lazy(() => import('./pages/dashboards/DoctorDashboard'));

// Shared & Specific Features
const DoctorsPage = lazy(() => import("./pages/doctors/DoctorsPage"));
const HealthVault = lazy(() => import("./pages/patient/HealthVault"));
const InventoryPage = lazy(() => import("./pages/admin/InventoryPage"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const NearByMedicalStore = lazy(() => import('./pages/NearByMedicalStore'));
const StoreSettings = lazy(() => import("./pages/admin/StoreSettings"));
const CalendarPage = lazy(() => import("./pages/admin/CalendarPage"));
const DoctorSchedule = lazy(() => import("./pages/doctors/DoctorSchedule"));
const PharmacyStore = lazy(() => import("./pages/patient/PharmacyStore"));
const DoctorCredentials=lazy(() => import("./pages/doctors/DoctorCredentials"));
const Membership=lazy(() => import("./pages/patient/Membership"));
const AIAnalysis=lazy(() => import("./pages/patient/AIAnalysis"));
const PatientsList=lazy(() => import("./pages/admin/PatientsList"));

// --- Professional Loading Component ---
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">MediConnect</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      {/* Suspense handles the "waiting" state while lazy components load */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Common Authenticated Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-stores" element={<NearByMedicalStore />} />

          {/* Patient Routes */}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/patient/doctors" element={<DoctorsPage role="patient" />} />
          <Route path="/health-vault" element={<HealthVault role="patient" />} />
          <Route path="/pharmecy" element={<PharmacyStore role="patient" />} />
          <Route path="/membership" element={<Membership role="patient" />} />
          <Route path="/ai-Analysis" element={<AIAnalysis role="patient" />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/schedule" element={<DoctorSchedule role="doctor" />} />
          <Route path="/doctor-credentials" element={<DoctorCredentials role="doctor" />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<DoctorsPage role="admin" />} />
          <Route path="/inventory" element={<InventoryPage role="admin" />} />
          <Route path="/admin/users" element={<UserManagement role="admin" />} />
          <Route path="/store-settings" element={<StoreSettings role="admin" />} />
          <Route path="/calendar" element={<CalendarPage role="admin" />} />
          <Route path="/admin/patients" element={<PatientsList role="admin" />} />

          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-black text-slate-900">404</h1>
              <p className="text-slate-500">Page not found.</p>
            </div>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;