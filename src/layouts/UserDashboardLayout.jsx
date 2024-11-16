import React from 'react';
import Sidebar from '../components/SideBar';

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User Dashboard</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
