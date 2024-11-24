import React, { useState } from 'react';
import { FaHome, FaList, FaPlusCircle, FaCalendarAlt, FaChartLine, FaEnvelope, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Correct import for React Router

const Sidebar = () => {
  const [isSidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Appears on hover */}
      <div
        className={`group bg-gray-800 text-white transition-all duration-300 ease-in-out ${isSidebarHovered ? 'w-64' : 'w-20'}`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="flex flex-col items-center py-6">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center w-full px-4">
            <h2
              className={`text-xl font-semibold transition-all duration-300 ${isSidebarHovered ? 'block' : 'hidden'}`}
            >
              Admin
            </h2>
            <button
              onClick={() => setSidebarHovered(!isSidebarHovered)}
              className="lg:hidden text-white"
              aria-label={isSidebarHovered ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {isSidebarHovered ? '⮖' : '⮘'}
            </button>
          </div>

          {/* Sidebar Links */}
          <ul className="mt-8 space-y-4 w-full px-2">
            <li>
              <Link to="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaHome className="mr-3" />
                {isSidebarHovered && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/properties" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaList className="mr-3" />
                {isSidebarHovered && <span>My Apartments</span>}
              </Link>
            </li>
            <li>
              {/* Use Link for navigation */}
              <Link to="/add-property" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaPlusCircle className="mr-3" />
                {isSidebarHovered && <span>Add Apartment</span>}
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaCalendarAlt className="mr-3" />
                {isSidebarHovered && <span>Bookings</span>}
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaChartLine className="mr-3" />
                {isSidebarHovered && <span>Analytics</span>}
              </Link>
            </li>
            <li>
              <Link to="/messages" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaEnvelope className="mr-3" />
                {isSidebarHovered && <span>Messages</span>}
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaUserCog className="mr-3" />
                {isSidebarHovered && <span>Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/logout" className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200">
                <FaSignOutAlt className="mr-3" />
                {isSidebarHovered && <span>Logout</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
