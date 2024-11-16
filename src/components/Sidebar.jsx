import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <NavLink 
            to="/dashboard/settings" 
            className="block p-2 rounded hover:bg-gray-700" 
            activeClassName="bg-blue-600"
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/profile" 
            className="block p-2 rounded hover:bg-gray-700" 
            activeClassName="bg-blue-600"
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/notifications" 
            className="block p-2 rounded hover:bg-gray-700" 
            activeClassName="bg-blue-600"
          >
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/messages" 
            className="block p-2 rounded hover:bg-gray-700" 
            activeClassName="bg-blue-600"
          >
            Messages
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
