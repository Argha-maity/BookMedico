import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-24 max-w-6xl mx-auto py-24 px-6">

      <h2 className="text-3xl font-bold text-center mb-12">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <input className="border p-3 rounded-lg" placeholder="Your Name" />
        <input className="border p-3 rounded-lg" placeholder="Email" />
        <textarea
          className="border p-3 rounded-lg col-span-2"
          placeholder="Message"
        ></textarea>

      </div>

      <div className="text-center mt-6">
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg">
          Send Message
        </button>
      </div>

    </section>
  );
};

export default Contact;