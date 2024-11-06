import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection after form submission

const AddPropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "apartment",
    imageUrl: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (isNaN(formData.price) || formData.price <= 0) newErrors.price = "Price must be a valid number greater than 0";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    // Simulate API call to submit the property data
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      alert("Property added successfully!");
      navigate("/dashboard"); // Redirect to the dashboard after success
    } catch (error) {
      setLoading(false);
      alert("An error occurred while adding the property.");
    }
  };

  return (
    <div
      className="w-auto h-auto  px-72 py-12"
      style={{
        backgroundImage: 'url("./src/assets/image/adpimg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2 className="text-3xl font-semibold text-center mb-8 text-white">Add a New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white bg-opacity-75 p-6 rounded-lg">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a description of your property"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (Monthly Rent)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price in USD"
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="apartment">Apartment</option>
            <option value="room">Room</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Property Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
          {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property location"
          />
          {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md bg-blue-500 text-white font-semibold transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
