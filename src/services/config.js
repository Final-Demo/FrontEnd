// src/services/config.js

import axios from 'axios';

// Access the VITE_BASE_URL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL || 'https://backend-xl0o.onrender.com/apartments'; // Default to your backend URL

// Retrieve the token from localStorage
const token = localStorage.getItem("token");

// Create the Axios client instance with the base URL
export const apiClient = axios.create({
  baseURL: baseURL,  // Use the environment variable for the base URL (or fallback)
  headers: {
    // Add the Authorization header only if the token is available
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

console.log('API base URL:', baseURL);  // Optional: Check if the baseURL is being set correctly
