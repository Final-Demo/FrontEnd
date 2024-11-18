// src/services/config.js

import axios from 'axios';

// Access the VITE_BASE_URL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL || 'https://fallback-url.com'; // Fallback URL for production

// Check for a stored token and set it in the headers if it exists
const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Create the Axios client instance
export const apiClient = axios.create({
  baseURL: baseURL,  // Use the environment variable for the base URL
});

console.log('API base URL:', baseURL);  // Optional: Check if the baseURL is being set correctly
