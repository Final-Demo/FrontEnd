import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle menu state
  };

  return (
    <nav className="bg-[#003366] p-4"> {/* Navy Blue background */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <LogoSection />

        {/* Hamburger Icon for Mobile */}
        <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Navigation Links */}
        <NavigationLinks isMenuOpen={isMenuOpen} />
      </div>
    </nav>
  );
}

// Logo Section Component
function LogoSection() {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img 
          src="src/assets/images/rent4melogo.jpg" // Replace with your logo image path
          alt="Logo"
          className="w-10 h-auto" // Set the logo height, adjust as needed
        />
      </Link>
      <h1 className='ml-2 text-white rounded-2xl font-bold'>RENT-4ME</h1>
    </div>
  );
}

// Hamburger Menu Component
function HamburgerMenu({ isMenuOpen, toggleMenu }) {
  return (
    <div className="md:hidden flex items-center">
      <button onClick={toggleMenu} className="text-white">
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />} {/* Show close or hamburger icon */}
      </button>
    </div>
  );
}

// Navigation Links Component
function NavigationLinks({ isMenuOpen }) {
  return (
    <ul
      className={`${
        isMenuOpen ? 'flex-col absolute bg-[#003366] w-full top-16 left-0 p-4' : 'hidden'
      } md:flex md:flex-row md:space-x-6 md:items-center md:bg-transparent md:p-0`}
    >
      <NavLink to="/" label="Home" />
      <NavLink to="/about-us" label="About" />
      <NavLink to="/contact" label="Contact" />
    </ul>
  );
}

// Individual Navigation Link Component
function NavLink({ to, label }) {
  return (
    <li>
      <Link to={to} className="text-white hover:text-[#FFD700]">
        {label}
      </Link>
    </li>
  );
}

export default Navbar;
