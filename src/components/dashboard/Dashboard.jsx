// components/dashboard/Dashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';  // We use Outlet for nested routes
import PropertyCard from './PropertyCard';

const Dashboard = () => {
  const properties = [
    { id: 1, title: 'Modern Apartment', price: '$1000', location: 'New York' },
    { id: 2, title: 'Luxury Villa', price: '$5000', location: 'Miami' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">My Dashboard</h2>

      {/* Dashboard Navigation */}
      <div className="space-x-4 mb-6">
        <Link to="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Dashboard Home
        </Link>
        <Link to="/dashboard/profile" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Profile
        </Link>
        <Link to="/dashboard/properties" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          My Properties
        </Link>
      </div>

      {/* Nested Route Content */}
      <Outlet /> {/* This will render the nested route component (Profile, Properties, etc.) */}

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
