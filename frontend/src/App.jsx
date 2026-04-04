import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import Profile from './pages/Profile';
import DoctorsPage from "./pages/doctors/DoctorsPage";
import HealthVault from "./pages/patient/HealthVault";
import InventoryPage from "./pages/admin/InventoryPage";
import UserManagement from "./pages/admin/UserManagement";
import NearByMedicalStore from './pages/NearByMedicalStore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/patient/doctors" element={<DoctorsPage role="patient" />} />
        <Route path="/admin/doctors" element={<DoctorsPage role="admin" />} />
        <Route path="/health-vault" element={<HealthVault role="patient" />} />
        <Route path="/inventory" element={<InventoryPage role="admin" />} />
        <Route path="/admin/users" element={<UserManagement role="admin" />} />
        <Route path="/medical-stores" element={<NearByMedicalStore />} />
      </Routes>
    </Router>
  );
}

export default App
