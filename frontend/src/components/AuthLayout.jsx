import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Glows (Matching your landing page) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] -z-10" />
      
      <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-4">
            <div className="border-2 border-primary rounded-lg p-1">🩺</div>
            <span>BookMedico</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
          <p className="text-slate-500 mt-2">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;