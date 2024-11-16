import React, { useState } from 'react';
import { apiAddProperty } from '../../services/apartments'; // Assuming you have an apiAddProperty function

const AddProperty = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [], // Array to hold image files
    category: 'house',
    amenities: [], // Optional, if you want to add these later
    status: 'available',
  });

  const [loading, setLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message

  // Handle input change for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes for amenities (if any)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, name],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        amenities: prevData.amenities.filter((amenity) => amenity !== name),
      }));
    }
  };

  // Handle file input for images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success message

    try {
      // Create FormData to submit to the API, since it handles files
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('location', formData.location);
      form.append('price', formData.price);
      form.append('category', formData.category);
      form.append('status', formData.status);

      // Add amenities (if any)
      formData.amenities.forEach((amenity) => form.append('amenities[]', amenity));

      // Add images (if any)
      formData.images.forEach((image) => form.append('images[]', image));

      // Send data to the API
      const response = await apiAddProperty(form);
      if (response.success) {
        setSuccess('Property added successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          price: '',
          images: [],
          category: 'house',
          amenities: [],
          status: 'available',
        }); // Clear the form after success
      } else {
        setError('Failed to add property. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Property</h2>

      {/* Success and Error Messages */}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Spacious 3-Bedroom House"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="A large 3-bedroom house perfect for families."
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Osu, Ghana"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="1500"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            {/* Add other categories if necessary */}
          </select>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <label className="block text-gray-700">Amenities</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Garden"
                checked={formData.amenities.includes('Garden')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Garden
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Playground"
                checked={formData.amenities.includes('Playground')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Playground
            </label>
            {/* Add more amenities here if needed */}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
