import React, { useState } from 'react';
import axios from 'axios';

const AddApartment = () => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [name]: checked,
      },
    }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: checked
        ? [...prevData.amenities, name]
        : prevData.amenities.filter((amenity) => amenity !== name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate that required fields are filled
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.price ||
      formData.images.length === 0
    ) {
      setLoading(false);
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('location', formData.location);
      formPayload.append('price', formData.price);
      formPayload.append('category', formData.category);
      formPayload.append('status', formData.status);
      formPayload.append('isApproved', formData.isApproved);

      // Add amenities
      formData.amenities.forEach((amenity, index) => {
        formPayload.append(`amenities[${index}]`, amenity);
      });

      // Add features
      Object.keys(formData.features).forEach((key) => {
        formPayload.append(`features[${key}]`, formData.features[key]);
      });

      // Add images (Ensure images is an array)
      Array.from(formData.images).forEach((image) => {
        formPayload.append('images', image);
      });

      // Get the token from localStorage or sessionStorage (assuming JWT)
      const token = localStorage.getItem('authToken');

      if (!token) {
        setLoading(false);
        setError('You are not logged in. Please log in and try again.');
        return;
      }

      // Send the POST request with the token in the Authorization header
      const { data } = await axios.post(
        'https://backend-xl0o.onrender.com/apartments',
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Apartment</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
          <input
            id="images"
            type="file"
            name="images"
            onChange={(e) => setFormData({ ...formData, images: e.target.files })}
            multiple
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amenities:</label>
          <div className="flex space-x-4">
            <div>
              <input
                type="checkbox"
                name="amenity1"
                onChange={handleAmenityChange}
                className="mr-2"
              />
              <label>Amenity 1</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="amenity2"
                onChange={handleAmenityChange}
                className="mr-2"
              />
              <label>Amenity 2</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Features:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFurnished"
                checked={formData.features.isFurnished}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Furnished
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isParkingAvailable"
                checked={formData.features.isParkingAvailable}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Parking Available
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAirConditionerAvailable"
                checked={formData.features.isAirConditionerAvailable}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Air Conditioner Available
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}
    </div>
  );
};

export default AddApartment;