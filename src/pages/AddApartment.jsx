import React, { useState } from "react";
import { apiClient } from "../services/config"; // Import the apiClient instance

const AddApartment = () => {
  const [apartment, setApartment] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [],
    category: '',  // Category should be required
    status: '',    // Status should be required
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Assuming the token is stored in localStorage
  const token = localStorage.getItem("authToken");

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file input change (multiple images)
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files).map(file => file);
    setApartment((prevState) => ({
      ...prevState,
      images: imagesArray,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("You are not logged in. Please log in again.");
      }

      // Validate required fields
      if (
        !apartment.title ||
        !apartment.description ||
        !apartment.location ||
        !apartment.price ||
        !apartment.category ||
        !apartment.status ||
        apartment.images.length === 0
      ) {
        setError("All fields are required, and at least one image must be uploaded.");
        return;
      }

      // Prepare FormData object
      const formData = new FormData();
      formData.append("title", apartment.title);
      formData.append("description", apartment.description);
      formData.append("location", apartment.location);
      formData.append("price", apartment.price);
      formData.append("category", apartment.category);
      formData.append("status", apartment.status);

      // Append each image file as a separate field with the same name "images[]"
      apartment.images.forEach((image) => {
        formData.append("images[]", image);  // Append the file with 'images[]' as key
      });

      // Log FormData to check the structure (for debugging purposes)
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Send the POST request with the authorization token in the header
      const response = await apiClient.post("/apartments", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      // Check if the response is successful
      if (response.status === 201) {
        alert("Apartment added successfully!");
        // Reset the form after successful submission
        setApartment({
          title: '',
          description: '',
          location: '',
          price: '',
          images: [],
          category: '',
          status: '',
        });
      }
    } catch (error) {
      console.error("Error posting apartment:", error);
      setError("There was an error adding the apartment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col">
        <label htmlFor="title" className="font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={apartment.title}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={apartment.description}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="location" className="font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={apartment.location}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={apartment.price}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          value={apartment.category}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
          <option value="shed">Shed</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="status" className="font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={apartment.status}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="available">Available</option>
          <option value="sold">Unavailable</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="images" className="font-medium text-gray-700">Images</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 flex space-x-2">
          {apartment.images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`apartment-img-${index}`} width="100" className="rounded-md" />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className={`px-6 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Apartment"}
        </button>
      </div>
    </form>
  );
};

export default AddApartment;
