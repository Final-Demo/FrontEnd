// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing

function Navbar() {
  return (
    <nav className="bg-[#003366] p-4"> {/* Navy Blue background */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">RentLinks</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-[#FFD700]">Home</Link> {/* Yellow hover text */}
          </li>
          <li>
            <Link to="/about-us" className="text-white hover:text-[#FFD700]">About</Link> {/* Yellow hover text */}
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-[#FFD700]">Contact</Link> {/* Yellow hover text */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
