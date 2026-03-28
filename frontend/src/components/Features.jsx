import React from "react";

const Features = () => {
  return (
    <section className="bg-white py-20 mt-24">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="p-6 shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Doctor Appointment
            </h3>
            <p className="text-gray-500">
              Easily book appointments with verified doctors.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Prescription Detection
            </h3>
            <p className="text-gray-500">
              Upload prescription and detect medicines using AI.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Medical Store Connect
            </h3>
            <p className="text-gray-500">
              Connect with nearby medical stores instantly.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;