import axios from 'axios';

// Base URLs
const API_URL = 'https://backend-xl0o.onrender.com/apartments';
const FAVORITE_API_URL = 'https://backend-xl0o.onrender.com/favorites';

// Retrieve token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Fetch all apartments
export const apiGetApartments = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched apartments:', response.data);
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch a single apartment by ID
export const apiGetApartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log('Fetched apartment details:', response.data);
    return response.data;
  } catch (error) {
    console.error(`API fetch error for apartment ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new property (POST request)
export const apiAddProperty = async (propertyData) => {
  const token = getAuthToken();
  try {
    const formData = new FormData();
    for (const key in propertyData) {
      if (Array.isArray(propertyData[key])) {
        propertyData[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, propertyData[key]);
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Property added:', response.data);
    return response.data;
  } catch (error) {
    console.error("API add property error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add apartment to favorites
export const apiAddToFavorite = async (apartmentId) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${FAVORITE_API_URL}/add`, { apartmentId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Added to favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error("API add to favorite error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Remove apartment from favorites
export const apiRemoveFromFavorite = async (apartmentId) => {
  const token = getAuthToken();
  try {
    const response = await axios.delete(`${FAVORITE_API_URL}/delete/${apartmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Removed from favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error("API remove from favorite error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get the user's favorites
export const apiGetFavorites = async () => {
  const token = getAuthToken();
  try {
    const response = await axios.get(FAVORITE_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fetched favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error("API get favorites error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
