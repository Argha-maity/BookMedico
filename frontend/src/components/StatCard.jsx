import React from "react";

const StatCard = ({ number, label }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-md rounded-xl px-8 py-6 text-center w-52 hover:shadow-lg transition">

      <h2 className="text-3xl font-bold text-gray-800">
        {number}
      </h2>

      <p className="text-gray-500 mt-1">
        {label}
      </p>

    </div>
  );
};

export default StatCard;