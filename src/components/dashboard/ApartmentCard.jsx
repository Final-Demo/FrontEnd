import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  // Use the imageUrl field from the backend or fallback to a default image URL
  const imageUrl = apartment.imageUrl || 'https://savefiles.org/secure/uploads/21045?shareable_link=511';

  return (
    <div className="apartment-card bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Display the apartment image, with a fallback if imageUrl is missing */}
      <img 
        src={imageUrl} 
        alt={apartment.name} 
        className="w-full h-56 object-cover" 
      />
      
      {/* Apartment name and description */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{apartment.name}</h3>
        <p className="text-gray-600 text-sm">{apartment.description}</p>
        <p className="text-green-600 font-semibold text-lg mt-2">${apartment.price}</p>

        {/* Link to the apartment details page */}
        <Link 
          to={`/apartmentdetail/${apartment.id}`} 
          className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ApartmentCard;
