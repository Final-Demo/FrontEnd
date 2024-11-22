import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth'; // assuming you have this function in your services
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import RentbgImg from '../../assets/image/RentbgImg.jpg'; // Import the image

const LoginForm = () => {
  const navigate = useNavigate();
  
  // State for form fields and validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Call the login API (assuming you have an API for login)
      const response = await loginUser({ email, password });

      console.log('Login response:', response); // Debug the response to ensure it contains expected data

      // If login is successful, store the user token or any relevant user data
      localStorage.setItem('authToken', response.token); // Assuming the response has a token

      setLoading(false);
      setSuccess('Login successful!');
      setTimeout(() => {
        console.log('Navigating to /home2'); // Add log to verify if it's being triggered
        navigate('/home2'); // Redirect to Home2 after 2 seconds
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : 'Something went wrong');
      console.error('Login error:', err); // Log any error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      {/* Flex Container for the Login Form and Additional Content */}
      <div className="flex flex-col md:flex-row max-w-4xl w-full p-8 bg-white shadow-2xl rounded-3xl backdrop-blur-lg bg-opacity-20">
        
        {/* Left Container: Login Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Welcome Back</h2>

          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="mt-2 block w-full px-6 py-4 border-2 border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-lg font-medium text-gray-800">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="mt-2 block w-full px-6 py-4 border-2 border-gray-300 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:bg-gray-300"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/register" className="text-lg text-blue-500 hover:underline hover:text-blue-600">Create New Account</a>
            <br />
            <a href="/forgot-password" className="text-lg text-blue-500 hover:underline hover:text-blue-600">Forgot Password?</a>
          </div>
        </div>

        {/* Right Container: Additional Information */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center rounded-r-3xl"
             style={{ backgroundImage: `url(${RentbgImg})`, minHeight: '400px' }}>
          {/* Add your extra content here */}
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white p-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Welcome to RentEase</h3>
              <p className="text-lg">Find the perfect apartment for you. Browse listings, book tours, and manage your preferences, all in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
