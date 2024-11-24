import React from 'react';
import { FaPhoneAlt, FaSearch, FaUser, FaSignInAlt } from 'react-icons/fa'; // Added icons for Login and Register

const Header = () => {
  return (
    <header className="bg-yellow-800 text-white py-4"> {/* Dark Yellow background */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6">
        
        {/* Left section: Phone Numbers, Email & Quick Links */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Phone Numbers */}
          <div className="flex items-center space-x-3">
            <FaPhoneAlt size={20} className="text-yellow-500" /> {/* Yellow icon */}
            <span className="text-sm">Call Us: +233 5424 80731</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <a
              href="mailto:support@example.com"
              className="text-sm text-yellow-300 hover:text-yellow-400"
              aria-label="Email support"
            >
              rentfourme@outlook.com
            </a>
          </div>

          {/* Quick Links (Business Hours) */}
          <div className="hidden sm:flex items-center space-x-3">
            <span className="text-sm">Mon - Fri: 9 AM - 6 PM</span>
            <span className="text-sm">Sat: 10 AM - 4 PM</span>
          </div>
        </div>

        {/* Middle section: Search Bar (Visible on larger screens) */}
        <div className="hidden sm:flex-1 sm:flex justify-center mt-4 sm:mt-0">
          <div className="relative w-full text-center max-w-md"> {/* Reduced max width here */}
            <input
              type="text"
              className="pl-6 text-center px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500" // Focus ring color changed to yellow
              placeholder="Search apartments..."
              aria-label="Search apartments"
            />
            <button className="absolute left-20 top-1/2 transform -translate-y-1/2">
              <FaSearch size={20} className="text-yellow-500" /> {/* Yellow icon */}
            </button>
          </div>
        </div>

        {/* Right section: Login, Register, etc. */}
        <div className="hidden sm:flex items-center space-x-6">
          <a href="/login" className="text-sm hover:text-yellow-400" aria-label="Login">Login</a>
          <a href="/register" className="text-sm hover:text-yellow-400" aria-label="Register">Register</a>
        </div>

        {/* Mobile section: Icons for Login and Register (visible on smaller screens) */}
        <div className="flex sm:hidden items-center space-x-4">
          <a href="/login" aria-label="Login">
            <FaSignInAlt size={24} className="text-yellow-500 hover:text-yellow-400" />
          </a>
          <a href="/register" aria-label="Register">
            <FaUser size={24} className="text-yellow-500 hover:text-yellow-400" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
