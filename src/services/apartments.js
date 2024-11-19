import axios from 'axios';

// Base URL for apartments API
const API_URL = 'https://backend-xl0o.onrender.com/apartments';

// Base URL for favorites API
const FAVORITE_API_URL = 'https://backend-xl0o.onrender.com/favorites';  // Update with actual API URL for favorites

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
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append fields to FormData
    for (const key in propertyData) {
      if (Array.isArray(propertyData[key])) {
        propertyData[key].forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, propertyData[key]);
      }
    }

    // Send the POST request with the form data
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        Authorization: `Bearer your-token-here`, // Optional: Add auth token if needed
      },
    });

    console.log('Property added:', response.data);  // Log only data to avoid clutter
    return response.data;  // Assuming the API returns the added property details
  } catch (error) {
    console.error("API add property error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};

// Add apartment to favorites
export const apiAddToFavorite = async (apartmentId) => {
  try {
    const response = await axios.post(`${FAVORITE_API_URL}/add`, { apartmentId });
    console.log('Added to favorites:', response.data);
    return response.data;  // Assuming the API returns updated favorites
  } catch (error) {
    console.error("API add to favorite error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};

// Remove apartment from favorites
export const apiRemoveFromFavorite = async (apartmentId) => {
  try {
    const response = await axios.delete(`${FAVORITE_API_URL}/delete/${apartmentId}`);
    console.log('Removed from favorites:', response.data);
    return response.data;  // Assuming the API returns updated favorites
  } catch (error) {
    console.error("API remove from favorite error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};

// Get the user's favorites
export const apiGetFavorites = async () => {
  try {
    const response = await axios.get(FAVORITE_API_URL);
    console.log('Fetched favorites:', response.data);  // Log only data to avoid clutter
    return response.data;  // Assuming the API returns the list of favorites
  } catch (error) {
    console.error("API get favorites error:", error.response ? error.response.data : error.message);
    throw error;  // Rethrow to handle in the component
  }
};
