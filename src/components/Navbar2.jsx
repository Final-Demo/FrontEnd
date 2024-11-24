import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaBars, FaArrowUp } from 'react-icons/fa'; // Added upgrade icon

function Navbar2() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store any error messages

  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate(); 

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page after sign-out
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await fetch('https://backend-xl0o.onrender.com/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (response.status === 401) {
          navigate('/login'); // Redirect to login page if unauthorized
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data); // Set the user data to state
      } catch (error) {
        setError('Error fetching user data: ' + error.message); // Handle errors
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]); // Effect will run once after component mounts

  return (
    <nav className="bg-[#003366] p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex flex-row items-center">
          {/* Logo Image */}
          <Link to="/">
            <img 
              src="src/assets/images/rent4melogo.jpg" // Replace with the actual path to your logo
              alt="Logo" 
              className="w-10 h-auto" // Adjust size as needed
            />
          </Link>
          <h1 className='ml-2 text-white rounded-2xl font-bold'>RENT-4ME</h1>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <FaBars size={24} />
          </button>
        </div>

        {/* Navbar links (visible on medium and larger screens) */}
        <ul className={`md:flex space-x-6 ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex`}>
          <li>
            <Link to="/home2" className="text-white hover:text-[#FFD700]">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="text-white hover:text-[#FFD700]">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-[#FFD700]">Contact</Link>
          </li>
        </ul>

        {/* Upgrade Membership Button (with icon and label) */}
        <div className="ml-4 flex items-center">
          <Link to="/upgrade" className="bg-[#FFD700] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#e6b800] flex items-center space-x-2">
            <FaArrowUp size={18} /> {/* Upgrade icon */}
            <span className="hidden md:inline">Upgrade</span> {/* Show label on medium and larger screens */}
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
            <span className="text-white mr-2">{user ? `Hi, ${user.firstName}` : 'Loading...'}</span> 
            
            {/* Profile Image */}
            <img
              src={user ? user.profilePicture : 'https://via.placeholder.com/40'}  // Use actual profile image if available
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
                {/* Sign Out Link */}
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#f0f0f0] hover:text-[#003366]"
                  >
                    Sign Out
                  </button>
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
