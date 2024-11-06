import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For routing to the property details page

const MyProperties = () => {
  const [properties, setProperties] = useState([]);  // Stores fetched properties
  const [loading, setLoading] = useState(true);       // Tracks loading state
  const [error, setError] = useState(null);           // Tracks any error during the API call

  // Fetch properties when component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://api.example.com/properties"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);  // Set the fetched data in state
        setLoading(false);     // Turn off loading state
      } catch (error) {
        setError(error.message);  // Set error state if fetch fails
        setLoading(false);        // Turn off loading state even if error occurs
      }
    };

    fetchProperties();  // Call fetch function when component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">My Properties</h2>

      {/* Loading and Error handling */}
      {loading && (
        <div className="text-center text-blue-500">Loading your properties...</div>
      )}
      {error && (
        <div className="text-center text-red-500">
          Error: {error}. Please try again later.
        </div>
      )}

      {/* If properties are fetched successfully */}
      {!loading && !error && properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{property.location}</p>
                <p className="text-lg font-bold text-gray-900 mt-4">
                  ${property.price} / month
                </p>
                <Link
                  to={`/properties/${property.id}`} // Link to property details page
                  className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <div className="text-center text-gray-500">You have no properties added yet.</div>
        )
      )}
    </div>
  );
};

export default MyProperties;
