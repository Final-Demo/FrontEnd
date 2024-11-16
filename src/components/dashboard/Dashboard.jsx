import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaUserCog, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const properties = [
    { id: 1, title: 'Modern Apartment', price: '$1000', location: 'New York' },
    { id: 2, title: 'Luxury Villa', price: '$5000', location: 'Miami' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`w-64 bg-gray-800 text-white p-6 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <h2 className="text-xl font-bold text-center mb-8">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-md">
                <FaHome />
                <span>Dashboard Home</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/properties" className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-md">
                <FaList />
                <span>My Properties</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/add-property" className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-md">
                <FaPlus />
                <span>Add Property</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/profile" className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-md">
                <FaUserCog />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-white p-4">
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h2>
        <Outlet />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
