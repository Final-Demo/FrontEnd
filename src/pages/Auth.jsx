// src/pages/Auth.js

import React, { useState } from 'react';

function Auth() {
  const [isRegister, setIsRegister] = useState(true);  // Toggle for register/login
  const [userType, setUserType] = useState('tenant');  // Tenant or Property Owner
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    propertyDetails: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle toggle between Tenant and Property Owner
  const handleUserTypeToggle = (type) => {
    setUserType(type);
    setFormData((prevState) => ({
      ...prevState,
      propertyDetails: '',  // Reset property details when switching user types
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // You can add more logic here like calling an API or validation.
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isRegister ? 'Register' : 'Login'} as {userType === 'tenant' ? 'Tenant' : 'Property Owner'}
        </h2>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`w-32 py-2 text-white rounded-md ${userType === 'tenant' ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => handleUserTypeToggle('tenant')}
          >
            Tenant
          </button>
          <button
            className={`w-32 py-2 text-white rounded-md ${userType === 'propertyOwner' ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => handleUserTypeToggle('propertyOwner')}
          >
            Property Owner
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Additional Fields Based on User Type */}
          {userType === 'tenant' ? (
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700">Property Details</label>
              <input
                type="text"
                name="propertyDetails"
                value={formData.propertyDetails}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>

          <div className="mt-4 text-center">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
