import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDoctors } from "../../services/doctorService";
import DoctorCard from "../../components/doctors/DoctorCard";
import AppointmentForm from "../../components/appointments/AppointmentForm";

const DoctorsPage = ({ role }) => {

  const [doctors, setDoctors] = useState([]);
  const [bookingDoctor, setBookingDoctor] = useState(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await getDoctors();
        //console.log("API Response:", res);
        setDoctors(res?.doctors || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setDoctors([]); 
      }
    };

    loadDoctors();
  }, []);

  return (
    <DashboardLayout role={role}>

      <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
        Doctors Directory
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {doctors.map((doc) => (
          <DoctorCard
            key={doc._id}
            doctor={doc}
            role={role}
            onBook={() => setBookingDoctor(doc)}
          />
        ))}

      </div>

      {bookingDoctor && (
        <AppointmentForm
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
        />
      )}

    </DashboardLayout>
  );
};

export default DoctorsPage;