import React from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import DoctorSection from "../components/doctors/DoctorSection";
import Features from "../components/Features";
import Advertisement from "../components/Advertisement";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import About from "../components/About";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-emerald-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-teal-200 rounded-full blur-3xl opacity-30"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mt-32 px-6 relative z-10">

        <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full text-sm text-gray-600">
          🩺 Trusted by 10,000+ patients
        </div>

        <h1 className="text-5xl font-bold mt-6 leading-tight text-gray-900">
          Book Your Doctor{" "}
          <span className="text-emerald-500">
            Appointment
          </span>{" "}
          in Seconds
        </h1>

        <p className="text-gray-500 mt-6 text-lg">
          Connect with verified doctors at your nearest medical store.
          Fast, reliable, and hassle-free appointment booking.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-8">

          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
            Get Started →
          </button>

          <button className="border border-emerald-500 text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition">
            Browse Doctors
          </button>

        </div>

      </section>

      {/* Stats Section */}
      <section className="flex justify-center gap-6 mt-16 flex-wrap relative z-10">

        <StatCard number="500+" label="Doctors" />
        <StatCard number="10K+" label="Patients" />
        <StatCard number="50+" label="Medical Stores" />
        <StatCard number="4.9 ⭐" label="Rating" />

      </section>

      <DoctorSection />

      <Features />

      <Advertisement />

      <About />

      <Contact />

      <Footer />

    </div>
  );
};

export default LandingPage;