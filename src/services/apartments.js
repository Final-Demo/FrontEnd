import axios from 'axios';

// Base URL for apartments API
const API_URL = 'https://backend-xl0o.onrender.com/apartments'; 

// Fetch all apartments
export const apiGetApartments = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched apartments:', response.data);  // Log only data to avoid clutter
    return response.data;  // Assuming the API returns the apartments in the 'data' field
  } catch (error) {
    console.error("API fetch error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};

// Fetch a single apartment by ID
export const apiGetApartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`); // Correct endpoint for fetching single apartment by ID
    console.log('Fetched apartment details:', response.data);  // Log only data to avoid clutter
    return response.data;  // Assuming the API returns the apartment details in the 'data' field
  } catch (error) {
    console.error(`API fetch error for apartment ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};

// Add a new property (POST request)
export const apiAddProperty = async (propertyData) => {
  try {
    const response = await axios.post(API_URL, propertyData);
    console.log('Property added:', response.data);  // Log only data to avoid clutter
    return response.data;  // Assuming the API returns the added property details
  } catch (error) {
    console.error("API add property error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};
