import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { signupUser } from "../services/auth";

const Signup = () => {

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("patient");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try{

      const fullName = formData.firstName + " " + formData.lastName;

      const res = await signupUser({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: userRole
      });

      localStorage.setItem("token", res.data.token);

      const role = res.data.user.role;

      if(role === "admin"){
        navigate("/admin-dashboard");
      }
      else if(role === "doctor"){
        navigate("/doctor-dashboard");
      }else{
        navigate("/patient-dashboard");
      }

    }catch(error){
      alert(error.response?.data?.message || "Signup failed");
    }

  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join 10,000+ users on BookMedico"
    >

      {/* Role Toggle */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">

        <button
          type="button"
          onClick={() => setUserRole("patient")}
          className={`flex-1 py-2 rounded-lg font-semibold ${
            userRole === "patient"
              ? "bg-white text-primary shadow"
              : "text-slate-500"
          }`}
        >
          Patient
        </button>

        <button
          type="button"
          onClick={() => setUserRole("doctor")}
          className={`flex-1 py-2 rounded-lg font-semibold ${
            userRole === "doctor"
              ? "bg-white text-primary shadow"
              : "text-slate-500"
          }`}
        >
          Doctor
        </button>

      </div>

      <form className="space-y-4" onSubmit={handleSignup}>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-50 border"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-slate-50 border"
          />

        </div>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border"
        />

        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
          Create {userRole} Account
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold">
            Log In
          </Link>
        </p>

      </form>

    </AuthLayout>
  );
};

export default Signup;