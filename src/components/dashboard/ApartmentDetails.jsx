import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { apiGetApartmentById, apiAddToFavorite, apiRemoveFromFavorite, apiGetFavorites } from "../../services/apartments"; // Importing the service

const ApartmentDetails = () => {
  const { id } = useParams(); // Get the apartment ID from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [actionType, setActionType] = useState(""); // To determine if the action is "Interest" or "Site Visit"
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the apartment is a favorite
  const [favorites, setFavorites] = useState([]); // To store list of favorite apartments

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

    const fetchFavorites = async () => {
      try {
        const favoritesData = await apiGetFavorites(); // Fetch the user's favorites
        setFavorites(favoritesData); // Store the favorites in the state
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchApartmentDetails();
    fetchFavorites(); // Fetch the favorites when component mounts
  }, [id]);

  useEffect(() => {
    if (favorites.length > 0) {
      setIsFavorite(favorites.some(fav => fav.id === id)); // Check if this apartment is in favorites
    }
  }, [favorites, id]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        await apiRemoveFromFavorite(id);
        setIsFavorite(false); // Update state to reflect the change
      } else {
        // Add to favorites
        await apiAddToFavorite(id);
        setIsFavorite(true); // Update state to reflect the change
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

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

  // Use Vite's import.meta.env to get the environment variable for images
  const imageBaseUrl = import.meta.env.VITE_BASE_URL || 'https://img.freepik.com/free-photo/city-background-panoramic-view_23-2148892966.jpg?semt=ais_hybrid';

  // Modal to show payment request info
  const handleButtonClick = (action) => {
    setActionType(action);
    setShowModal(true); // Show the modal when a button is clicked
  };

  const handleConfirmPayment = () => {
    setShowModal(false); // Close the modal when payment is confirmed
    alert(`Proceed with the payment for ${actionType === "interest" ? "Indicating Interest" : "Site Visit"}`);
    // Add your payment gateway logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Styled Back Arrow Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center text-gray-600 hover:text-gray-800 text-lg py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200 mb-4"
      >
        <i className="fas fa-arrow-left mr-2"></i> {/* Arrow icon */}
        Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{location}</p>
      <p className="text-lg text-gray-900 mb-6">${price}</p>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        {/* Image Gallery on the Left */}
        <div className="sm:w-1/2">
          {images && images.length > 0 ? (
            <img
              src={`${imageBaseUrl}/${images[0]}`} // Use dynamic image URL
              alt={title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex justify-center items-center text-gray-500">
              No image available
            </div>
          )}
        </div>

        {/* Details and Description on the Right */}
        <div className="sm:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 mb-6">{description}</p>

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
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200 w-full mb-4">
            Contact Landlord
          </button>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-600 transition-colors duration-200`}
          >
            <i className={`fa${isFavorite ? "s" : "r"} fa-heart`}></i>
          </button>

          {/* Additional Buttons for Interest or Site Visit */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleButtonClick("interest")}
              className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-200"
            >
              Indicate Interest
            </button>
            <button
              onClick={() => handleButtonClick("site visit")}
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-colors duration-200"
            >
              Request Site Visit
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Commitment Fee */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Commitment Fee of 100 Ghana Cedis
            </h3>
            <p className="text-gray-600 mb-4">
              To proceed with your request, a commitment fee of 100 Ghana Cedis is required. This fee will
              ensure that your interest is considered seriously, and will be deducted from the final payment if
              you proceed with the rental.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmPayment}
                className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetails;
