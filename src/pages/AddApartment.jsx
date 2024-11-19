import React, { useState } from 'react';
import axios from 'axios';

const AddApartment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: [],
    category: 'apartment',  // Default category
    amenities: [], // This will be an array of strings
    status: 'available',
    features: {
      isFurnished: false,
      isParkingAvailable: false,
      isAirConditionerAvailable: false,
    },
    isApproved: false,  // Default approval status
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        features: { ...formData.features, [name]: checked },
      });
    } else if (name === 'amenities') {
      const newAmenities = value.split(',').map(item => item.trim());
      setFormData({ ...formData, amenities: newAmenities });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files), // Convert FileList to array
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic form validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.price ||
      formData.images.length === 0 // Ensure images are selected
    ) {
      setLoading(false);
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const formPayload = new FormData();

      // Append all form data to FormData
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('location', formData.location);
      formPayload.append('price', formData.price);
      formPayload.append('category', formData.category);
      formPayload.append('status', formData.status);
      formPayload.append('isApproved', formData.isApproved);

      // Append amenities (as separate values)
      formData.amenities.forEach((amenity, index) => {
        formPayload.append(`amenities[${index}]`, amenity);
      });

      // Append features (as separate values)
      Object.keys(formData.features).forEach((key) => {
        formPayload.append(`features[${key}]`, formData.features[key]);
      });

      // Append images (if any) to FormData
      formData.images.forEach((image) => {
        formPayload.append('images', image);
      });

      // Log the formPayload to inspect the data
      console.log('Sending FormData:', formPayload);

      // Send the form data to the backend
      const { data } = await axios.post('https://backend-xl0o.onrender.com/apartments', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success after receiving the response
      setLoading(false);
      setSuccess('Apartment added successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        price: '',
        images: [],
        category: 'apartment',
        amenities: [],
        status: 'available',
        features: {
          isFurnished: false,
          isParkingAvailable: false,
          isAirConditionerAvailable: false,
        },
        isApproved: false,
      });
    } catch (error) {
      setLoading(false);
      setError('Failed to add apartment. Please try again.');
      console.error('Error adding apartment:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Apartment</h2>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Success message */}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Apartment title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Apartment description"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Apartment location"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Price in GHS"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label htmlFor="images" className="block text-gray-700">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="shared">Shared</option>
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label htmlFor="amenities" className="block text-gray-700">Amenities</label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={formData.amenities.join(', ')}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Comma-separated amenities (e.g., Garden, Playground)"
          />
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-gray-700">Features</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFurnished"
              name="isFurnished"
              checked={formData.features.isFurnished}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <label htmlFor="isFurnished" className="ml-2">Furnished</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isParkingAvailable"
              name="isParkingAvailable"
              checked={formData.features.isParkingAvailable}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <label htmlFor="isParkingAvailable" className="ml-2">Parking Available</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAirConditionerAvailable"
              name="isAirConditionerAvailable"
              checked={formData.features.isAirConditionerAvailable}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <label htmlFor="isAirConditionerAvailable" className="ml-2">Air Conditioner Available</label>
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {loading ? 'Adding...' : 'Add Apartment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApartment;
