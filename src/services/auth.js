import { apiClient } from './config';
import Cookies from 'js-cookie'; // For better security, use cookies to store the JWT token

// Function to login user
export const loginUser = async (userData) => {
  try {
    // Make a POST request to the backend using the configured apiClient
    const response = await apiClient.post('/auth/login', userData);
    
    // Handle successful login (e.g., store token in cookies for better security)
    if (response.data && response.data.token) {
      // Assuming the API returns a JWT token upon successful login
      Cookies.set('authToken', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
    }
    
    console.log('Login successful:', response.data);  // Log the successful login response
    return response.data; // Return the data received from the backend
  } catch (error) {
    // Improved error handling with user-friendly message
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.'); // Rethrow a custom error message
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
    // Improved error handling with user-friendly message
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.'); // Rethrow a custom error message
  }
};

// Function to check if user is authenticated (by checking for token in cookies)
export const isAuthenticated = () => {
  const token = Cookies.get('authToken'); // Fetch the token from cookies instead of localStorage
  return !!token; // Returns true if token exists, otherwise false
};

// Function to logout user
export const logoutUser = () => {
  // Clear the token from cookies for better security
  Cookies.remove('authToken');
  console.log('User logged out');
};

// Function to verify email using the token
export const verifyEmail = async (token) => {
  try {
    // Send GET request to backend to verify email with token
    const response = await apiClient.get(`/verify-email/${token}`);
    
    // Handle successful verification
    if (response.data.success) {
      console.log('Email verified successfully:', response.data);
      return response.data; // Return the success message or data
    } else {
      console.log('Email verification failed:', response.data.message);
      throw new Error('Email verification failed. Please check the link and try again.');
    }
  } catch (error) {
    console.error('Error verifying email:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'An error occurred during email verification. Please try again.');
  }
};
