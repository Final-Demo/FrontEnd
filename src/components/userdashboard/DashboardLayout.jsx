import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  // State to toggle the sidebar on small screens
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex-1 p-6 bg-gray-50 transition-all ${
          sidebarOpen ? "ml-64" : "md:ml-64"
        }`}
      >
        {/* Hamburger button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 text-gray-800 bg-yellow-500 rounded-full fixed top-6 left-6 z-20"
        >
          ☰
        </button>

        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
