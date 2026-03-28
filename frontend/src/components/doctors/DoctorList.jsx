import React from "react";

const DoctorList = ({ doctors, onBook }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

      <h3 className="text-xl font-bold text-slate-800 mb-6">
        Available Doctors
      </h3>

      <div className="space-y-4">

        {doctors.map((doc) => (

          <div
            key={doc._id}
            className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <img
                src={doc.image || `https://ui-avatars.com/api/?name=${doc.name}`}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <p className="font-bold text-slate-800">{doc.name}</p>

                <p className="text-xs text-slate-500">
                  {doc.specialty} • {doc.experience} yrs
                </p>

                <p className="text-xs text-slate-400">
                  {doc.hospital}
                </p>
              </div>

            </div>

            {/* BUTTON */}
            {onBook && (
              <button
                onClick={() => onBook(doc)}
                className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition"
              >
                Book
              </button>
            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default DoctorList;