import React from "react";

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            About <span className="text-emerald-500">BookMedico</span>
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            BookMedico is a smart healthcare platform designed to simplify
            doctor consultations and medical assistance. Our platform helps
            patients easily find verified doctors, book appointments, and
            connect with nearby medical stores.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            With our advanced AI-powered prescription detection system,
            patients can upload prescriptions and instantly identify
            medicines while finding nearby pharmacies.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to make healthcare accessible, fast, and reliable
            for everyone.
          </p>

          <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium">
            Learn More
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/online-doctor-concept_52683-37478.jpg"
            alt="doctor consultation"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>

      </div>

    </section>
  );
};

export default About;