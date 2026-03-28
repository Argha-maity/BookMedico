import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white p-2 rounded-lg">
            🩺
          </div>
          <h1 className="text-xl font-bold text-emerald-600">
            BookMedico
          </h1>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 font-medium">

          <a href="#" className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full">
            Home
          </a>

          <a href="#doctors" className="hover:text-emerald-600 cursor-pointer">
            All Doctors
          </a>

          <a href="#about" className="hover:text-emerald-600 cursor-pointer">
            About
          </a>

          <a href="#contact" className="hover:text-emerald-600 cursor-pointer">
            Contact
          </a>

        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 font-medium hover:text-emerald-600 transition">
            Log in
          </Link>

          <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-md shadow-emerald-500/20">
            Sign up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;