import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="apartment-card">
      <img src={apartment.imageUrl} alt={apartment.name} />
      <h3>{apartment.name}</h3>
      <p>{apartment.description}</p>
      <Link to={`/apartment/${apartment.id}`}>View Details</Link>
    </div>
  );
};

export default ApartmentCard;
