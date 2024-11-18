import { apiClient } from './config';

// Function to login user
export const loginUser = async (userData) => {
  try {
    // Make a POST request to the backend using the configured apiClient
    const response = await apiClient.post('/auth/login', userData);
    
    // Handle successful login (e.g., store token in localStorage)
    if (response.data && response.data.token) {
      // Assuming the API returns a JWT token upon successful login
      localStorage.setItem('authToken', response.data.token); // Store token in localStorage (or use cookies for better security)
    }
    
    console.log('Login successful:', response.data);  // Log the successful login response
    return response.data; // Return the data received from the backend
  } catch (error) {
    // Improved error handling
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle in the component
  }
};

// Function to register user
export const registerUser = async (userData) => {
  try {
    // Make a POST request to the backend using the configured apiClient
    const response = await apiClient.post('/auth/register', userData);
    
    console.log('Registration successful:', response.data); // Log the successful registration response
    return response.data; // Return the data received from the backend (e.g., user details or success message)
  } catch (error) {
    // Improved error handling
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle in the component
  }
};

// Function to check if user is authenticated (by checking for token in localStorage)
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Returns true if token exists, otherwise false
};

// Function to logout user
export const logoutUser = () => {
  // Clear the token from localStorage (or cookies)
  localStorage.removeItem('authToken');
  console.log('User logged out');
};
