import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#003366] p-4"> {/* Navy Blue background */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <Link to="/">Rent4Me</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />} {/* Show close or hamburger icon */}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? 'flex-col absolute bg-[#003366] w-full top-16 left-0 p-4' : 'hidden'
          } md:flex md:flex-row md:space-x-6 md:items-center md:bg-transparent md:p-0`}
        >
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
      </div>
    </nav>
  );
}

export default Navbar;
