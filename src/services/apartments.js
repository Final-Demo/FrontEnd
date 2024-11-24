import { apiClient } from "./config";

// Update the URL to use the correct API endpoint
export const apiGetApartments = async () => {
  return apiClient.get("https://backend-xl0o.onrender.com/apartments");
};

export const apiAddApartment = async (payload) => {
  try {
    const response = await apiClient.post("/apartments", payload, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the header is set for file upload
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding apartment:", error);
    throw error;
  }
};

export const apiGetApartmentById = async (id) => apiClient.get(`/apartments/${id}`);
export const apiUpdateApartment = async (id, payload) => {
  const apartment = await apiClient.patch(`/apartments/${id}`, payload);
  return apartment;
};
export const apiDelApartment = async (id) => apiClient.delete(`/apartments/${id}`);
