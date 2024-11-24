import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="apartment-card">
      {/* Add a fallback image if imageUrl is missing */}
      <img 
        src={apartment.imageUrl || 'https://via.placeholder.com/150'} 
        alt={apartment.name} 
      />
      <h3>{apartment.name}</h3>
      <p>{apartment.description}</p>
      {/* Updated to use the correct route */}
      <Link to={`/apartmentdetail/${apartment.id}`}>View Details</Link>
    </div>
  );
};

export default ApartmentCard;
