import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Fetch the token from localStorage
const token = localStorage.getItem("token");

// If token exists, set the Authorization header
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Create an axios instance with the base URL
export const apiClient = axios.create({
    baseURL: baseUrl,
});

// Log baseUrl only in development
if (import.meta.env.MODE === "development") {
    console.log('base URL:', baseUrl);
}

// Optional: Add response error handling for the axios instance
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API request failed:', error);
        return Promise.reject(error);
    }
);
