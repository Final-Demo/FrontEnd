// components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Property Finder</Link>
        </h1>
        <nav>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/Auth" className="mr-4">Login</Link>
          <Link to="/register" className="mr-4">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
