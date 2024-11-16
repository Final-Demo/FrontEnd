import axios from 'axios';

// Set the correct baseURL
const baseURL = "https://backend-xl0o.onrender.com";
// Uncomment if you're working with a local server: const baseURL = "http://localhost:3000";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Create the axios client instance
export const apiClient = axios.create({
  baseURL: baseURL, // Correct variable name here
});

console.log('API base URL:', baseURL); // This will help you debug if the baseURL is set correctly
