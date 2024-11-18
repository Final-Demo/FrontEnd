import React, { useState } from 'react';
import { FaHome, FaList, FaPlusCircle, FaCalendarAlt, FaChartLine, FaEnvelope, FaUserCog, FaSignOutAlt } from 'react-icons/fa';

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
              Property Owner
            </h2>
            <button
              onClick={() => setSidebarHovered(!isSidebarHovered)}
              className="lg:hidden text-white"
            >
              {isSidebarHovered ? '⮖' : '⮘'}
            </button>
          </div>

          {/* Sidebar Links */}
          <ul className="mt-8 space-y-4 w-full px-2">
            <li>
              <a href="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaHome className="mr-3" />
                {isSidebarHovered && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="/properties" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaList className="mr-3" />
                {isSidebarHovered && <span>My Properties</span>}
              </a>
            </li>
            <li>
              <a href="/add-property" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaPlusCircle className="mr-3" />
                {isSidebarHovered && <span>Add Property</span>}
              </a>
            </li>
            <li>
              <a href="/bookings" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaCalendarAlt className="mr-3" />
                {isSidebarHovered && <span>Bookings</span>}
              </a>
            </li>
            <li>
              <a href="/analytics" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaChartLine className="mr-3" />
                {isSidebarHovered && <span>Analytics</span>}
              </a>
            </li>
            <li>
              <a href="/messages" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaEnvelope className="mr-3" />
                {isSidebarHovered && <span>Messages</span>}
              </a>
            </li>
            <li>
              <a href="/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaUserCog className="mr-3" />
                {isSidebarHovered && <span>Profile</span>}
              </a>
            </li>
            <li>
              <a href="/logout" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                <FaSignOutAlt className="mr-3" />
                {isSidebarHovered && <span>Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
