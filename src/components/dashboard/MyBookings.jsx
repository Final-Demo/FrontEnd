import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]); // State to hold the booking data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Fetch bookings data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://backend-xl0o.onrender.com/booking/my');
        setBookings(response.data); // Assuming the response is an array of bookings
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  if (loading) {
    return <div>Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {/* If no bookings are found */}
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Property Name</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="py-2 px-4">{booking.propertyName}</td>
                <td className="py-2 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
