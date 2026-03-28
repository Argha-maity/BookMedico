import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { getDoctors } from "../../services/doctorService";

const DoctorSection = () => {

  const [doctors, setDoctors] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data.doctors);
    };

    fetchDoctors();
  }, []);

  const visibleDoctors = showAll ? doctors : doctors.slice(0, 4);

  return (
    <section id="doctors" className="max-w-7xl mx-auto mt-24 px-6">

      <h2 className="text-3xl font-bold text-center mb-12">
        Our Top Doctors
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {visibleDoctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          {showAll ? "Show Less" : "Show All Doctors"}
        </button>
      </div>

    </section>
  );
};

export default DoctorSection;