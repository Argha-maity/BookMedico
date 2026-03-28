import React from "react";

const Advertisement = () => {
  return (
    <section className="bg-emerald-500 text-white py-16 mt-24">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">
          Upload Your Prescription
        </h2>

        <p className="mb-6">
          Our AI will detect medicines and connect you with nearby stores.
        </p>

        <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold">
          Upload Prescription
        </button>

      </div>

    </section>
  );
};

export default Advertisement;