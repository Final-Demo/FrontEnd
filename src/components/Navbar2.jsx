import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaChevronDown } from 'react-icons/fa'; // Importing the down arrow icon

function Navbar2() {
  // State to toggle the dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  // Create a reference for the dropdown menu to detect clicks outside
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to close the dropdown when clicking outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !profileButtonRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener to close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="bg-[#003366] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <Link to="/">Rent4Me</Link>
        </div>

        {/* Navbar links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-[#FFD700]">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="text-white hover:text-[#FFD700]">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-[#FFD700]">Contact</Link>
          </li>
        </ul>

        {/* Upgrade Membership Button */}
        <div className="ml-4">
          <Link to="/upgrade" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#e6b800]">
            Upgrade Membership
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          {/* Profile Button with Greeting */}
          <button
            ref={profileButtonRef}  // Reference for the profile button
            onClick={toggleDropdown}  // Toggle dropdown on click
            className="text-white flex items-center space-x-2 hover:text-[#FFD700] focus:outline-none"
          >
            {/* Greeting Text */}
            <span className="text-white mr-2">Hi, welcome Benjamin</span> 
            
            {/* Profile Image */}
            <img
              src="https://via.placeholder.com/40"  // Replace with actual profile image URL
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"  // Styling the profile image
            />
            <FaChevronDown className="text-white" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}  // Reference for the dropdown menu
              className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg z-10 profile-dropdown"
            >
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-[#f0f0f0] hover:text-[#003366]"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-[#f0f0f0] hover:text-[#003366]"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notifications"
                    className="block px-4 py-2 text-sm hover:bg-[#f0f0f0] hover:text-[#003366]"
                  >
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-[#f0f0f0] hover:text-[#003366]"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;