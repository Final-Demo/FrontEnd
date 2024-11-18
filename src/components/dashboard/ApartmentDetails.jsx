import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the 'id' from the URL
import { apiGetApartmentById } from "../../services/apartments"; // Importing the service

const ApartmentDetails = () => {
  const { id } = useParams(); // Get the apartment ID from the URL
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      setLoading(true);
      setError(null);

      if (!id) {
        setError("Apartment ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const apartmentData = await apiGetApartmentById(id); // Fetch apartment by ID
        setApartment(apartmentData); // Set the apartment data to state
      } catch (err) {
        setError("Failed to fetch apartment details.");
        console.error("Error fetching apartment details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [id]); // Re-fetch if the apartment ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading apartment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()} // Optionally, reload the page if error
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200 mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!apartment) {
    return <div>No apartment found.</div>;
  }

  // Destructure apartment data for convenience
  const {
    title,
    description,
    location,
    price,
    images,
    features,
    amenities,
  } = apartment;

  // Use Vite's import.meta.env to get the environment variable
  const imageBaseUrl = import.meta.env.VITE_BASE_URL || 'https://default-image-url.com';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{location}</p>
      <p className="text-lg text-gray-900 mb-6">${price}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Image Gallery */}
        <div>
          {images && images.length > 0 ? (
            <img
              src={`${'https://savefiles.org/secure/uploads/21045?shareable_link=511'}/${images[0]}`}
              alt={title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex justify-center items-center text-gray-500">
              No image available
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
        <ul className="list-disc pl-6">
          <li>{features?.isFurnished ? "Furnished" : "Unfurnished"}</li>
          <li>{features?.isParkingAvailable ? "Parking Available" : "No Parking"}</li>
          <li>{features?.isAirConditionerAvailable ? "Air Conditioning" : "No Air Conditioning"}</li>
        </ul>
      </div>

      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
          <ul className="list-disc pl-6">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact Button */}
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200">
        Contact Landlord
      </button>
    </div>
  );
};

export default ApartmentDetails;
