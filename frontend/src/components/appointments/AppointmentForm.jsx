import React, { useState } from "react";
import { bookAppointment } from "../../services/appointmentService";

const AppointmentForm = ({ doctor, doctrors, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookAppointment({
        doctorId: doctor._id,
        slotDate: date,
        slotTime: time,
        amount: 500
      });

      alert("Appointment Booked Successfully!");
      onClose();

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[420px] shadow-xl">

        <h3 className="text-xl font-bold mb-6">
          Book Appointment
        </h3>

        <p className="text-sm mb-4 text-slate-600">
          Doctor: <span className="font-bold">{doctor.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />

          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-xl"
          >
            <option value="">Select Time Slot</option>
            <option>09:00 AM</option>
            <option>10:30 AM</option>
            <option>12:00 PM</option>
            <option>02:00 PM</option>
            <option>04:00 PM</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 rounded-xl"
            >
              Confirm
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AppointmentForm;