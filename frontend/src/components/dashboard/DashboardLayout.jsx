import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]"> {/* Slate-50 background for professional feel */}
      
      <Sidebar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 1. lg:pl-72: Reserves space for the fixed sidebar on Desktop.
          2. flex-col: Stack Topbar and Main content.
      */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;