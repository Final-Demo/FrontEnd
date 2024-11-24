import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { apiGetApartmentById } from "../../services/apartments"; // Assuming the API function for fetching a single apartment

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartmentData, setApartmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");

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
        const response = await apiGetApartmentById(id);
        if (response.status === 200 && response.data) {
          setApartmentData(response.data);
        } else {
          setError("Failed to fetch apartment details.");
        }
      } catch (err) {
        setError("Failed to fetch apartment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApartmentDetails();
  }, [id]);

  const handleButtonClick = (action) => {
    setActionType(action);
    setShowModal(true);
  };

  const handleConfirmPayment = () => {
    setShowModal(false);
    alert(`Proceed with the payment for ${actionType === "interest" ? "Indicating Interest" : "Site Visit"}`);
  };

  const handleCloseModal = () => {
    setActionType("");
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin border-4 border-t-4 border-blue-500 w-16 h-16 border-solid rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200 mt-4">
          Retry
        </button>
      </div>
    );
  }

  if (!apartmentData) {
    return <div>No apartment found.</div>;
  }

  const { title, description, location, price, images } = apartmentData;
  const imageBaseUrl = import.meta.env.VITE_BASE_URL || 'https://savefiles.org/secure/uploads/21045?shareable_link=511';
  const imageUrl = images?.length ? `${imageBaseUrl}/${images[0]}` : 'default-image.jpg';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 text-lg py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200 mb-4">
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{location}</p>
      <p className="text-lg text-gray-900 mb-6">${price}</p>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="sm:w-1/2">
          <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
        </div>

        <div className="sm:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
          <p className="text-gray-600 mb-6">{description}</p>

          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200 w-full mb-4">
            Contact Landlord
          </button>

          <div className="flex space-x-4">
            <button onClick={() => handleButtonClick("interest")} className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-200">Indicate Interest</button>
            <button onClick={() => handleButtonClick("site visit")} className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-colors duration-200">Request Site Visit</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full" aria-live="assertive">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Commitment Fee of 100 Ghana Cedis for {actionType === "interest" ? "Indicating Interest" : "Site Visit"}
            </h3>
            <p className="text-gray-600 mb-4">
              To proceed with your request, a commitment fee of 100 Ghana Cedis is required. This fee will ensure that your interest is considered seriously, and will be deducted from the final payment if you proceed with the rental.
            </p>
            <div className="flex space-x-4">
              <button onClick={handleConfirmPayment} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200">Confirm Payment</button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetails;
