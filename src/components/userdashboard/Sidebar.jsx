import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faHome,
  faCog,
  faSignOutAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-10 h-full bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0`}
    >
      <div className="flex flex-col p-6">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-8">
          User Dashboard
        </h2>

        {/* Sidebar Navigation */}
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="text-lg" />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-4">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mybookings"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faHome} className="text-lg" />
                <span className="ml-4">My Apartments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faChartLine} className="text-lg" />
                <span className="ml-4">Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faCog} className="text-lg" />
                <span className="ml-4">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                <span className="ml-4">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Close sidebar on mobile when a link is clicked */}
      <div className="md:hidden absolute top-4 right-4">
        <button onClick={toggleSidebar} className="text-white text-2xl">
          ×
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
