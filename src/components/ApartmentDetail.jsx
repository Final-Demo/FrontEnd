import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // To get the 'id' from the URL
import { apiGetApartmentById } from '../services/apartments'; // Assuming you have a service to fetch apartment details

const ApartmentDetails = () => {
  const { id } = useParams();  // Get the apartment ID from the URL
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      setLoading(true);
      setError(null);

      if (!id) {
        setError('Apartment ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await apiGetApartmentById(id); // Fetch apartment by ID from the API
        setApartment(response); // Set the apartment data to state
      } catch (err) {
        setError('Failed to fetch apartment details');
        console.error('Error fetching apartment details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [id]); // Re-fetch if the apartment ID changes

  if (loading) return <div>Loading apartment details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!apartment) return <div>No apartment found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800">{apartment.title}</h2>
      <p className="text-lg text-gray-600 mb-4">{apartment.location}</p>
      <p className="text-lg text-gray-900 mb-6">${apartment.price}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <img
            src={`https://savefiles.org/secure/uploads/21045?shareable_link=511/${apartment.images[0]}`}  // Assuming image URL structure
            alt={apartment.title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600">{apartment.description}</p>
        </div>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200">
        Contact Landlord
      </button>
    </div>
  );
};

export default ApartmentDetails;
