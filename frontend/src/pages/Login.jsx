import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/auth";

const Login = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    emailOrPhone:"",
    password:""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e)=>{

    e.preventDefault();

    try{

      const payload = {
        password: formData.password
      };

      if(formData.emailOrPhone.includes("@")){
        payload.email = formData.emailOrPhone;
      }else{
        payload.phone = formData.emailOrPhone;
      }

      const res = await loginUser(payload);

      localStorage.setItem("token",res.data.token);

      const role = res.data.user.role;

      if(role === "admin"){
        navigate("/admin-dashboard");
      }
      else if(role === "doctor"){
        navigate("/doctor-dashboard");
      }else{
        navigate("/patient-dashboard");
      }

    }catch(err){
      alert("Login failed");
    }

  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login using your email or phone number"
    >

      <form className="space-y-6" onSubmit={handleLogin}>

        <input
          name="emailOrPhone"
          placeholder="Email or Phone"
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl bg-slate-50 border"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-xl bg-slate-50 border"
        />

        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
          Sign In
        </button>

        <p className="text-center text-sm text-slate-500">
          New to BookMedico?{" "}
          <Link to="/signup" className="text-primary font-bold">
            Create Account
          </Link>
        </p>

      </form>

    </AuthLayout>
  );
};

export default Login;