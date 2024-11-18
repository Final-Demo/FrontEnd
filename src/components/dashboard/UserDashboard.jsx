import React, { useEffect, useState } from 'react';
// import { apiGetApartmentstUserApartments } from '../../services/apartments';  // Make sure the path is correct

const UserDashboard = ({ userId }) => {
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserApartments = async () => {
      try {
        const data = await apiGetApartmentstUserApartments(userId);  // Assuming userId is passed as a prop or obtained from context
        setApartments(data);
      } catch (err) {
        setError('Failed to fetch apartments');
      }
    };

    fetchUserApartments();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Apartments</h2>
      <ul>
        {apartments.map((apartment) => (
          <li key={apartment.id}>{apartment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
