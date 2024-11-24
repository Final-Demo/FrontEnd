import React, { useState, useEffect } from 'react';
import { apiGetApartments } from '../services/apartments'; // Import the API function
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('apartments');
  const [apartments, setApartments] = useState([]); // State to hold fetched apartments
  const [filteredApartments, setFilteredApartments] = useState([]); // State for filtered apartments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Fetch apartments from API when the category changes or component mounts
  useEffect(() => {
    const fetchApartments = async () => {
      setLoading(true); // Set loading state to true before fetching
      setError(null); // Reset any previous errors
  
      try {
        const apartmentsData = await apiGetApartments(selectedCategory); // Fetch data from API
        console.log('Fetched apartments data:', apartmentsData);  // Log the entire API response
  
        // Ensure the response contains the apartments array
        if (apartmentsData && apartmentsData.data && Array.isArray(apartmentsData.data.apartment)) {
          setApartments(apartmentsData.data.apartment); // Set apartments to state (using 'apartment' from response)
          setFilteredApartments(apartmentsData.data.apartment); // Initially show all apartments
        } else {
          setError('Invalid data received from the server.');
          setFilteredApartments([]); // Reset filtered apartments on error
        }
      } catch (err) {
        setError('Failed to fetch apartments. Please try again later.'); // Set error message if fetch fails
        console.error('API fetch error:', err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };
  
    fetchApartments(); // Call the fetch function on mount or category change
  }, [selectedCategory]); // Dependency on selectedCategory, refetch if category changes  

  // Handle search query change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter apartments based on the search query
    const filtered = apartments.filter(
      (apartment) =>
        apartment.title && apartment.title.toLowerCase().includes(query) || // Filter by title
        apartment.location && apartment.location.toLowerCase().includes(query) // Filter by location
    );

    setFilteredApartments(filtered); // Update filtered apartments state
  };

  // Handle "All Properties" button click
  const handleAllProperties = () => {
    setSearchQuery(''); // Clear the search query
    setFilteredApartments(apartments); // Show all apartments
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* Hero Section with Catchy Statement */}
      <section className="relative w-full overflow-hidden">
        <div className="w-full h-full mt-4">
          <img
            src="https://www.shutterstock.com/image-photo/happy-young-man-holding-keys-600nw-2481559719.jpg"
            alt="Hero 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Catchy Statement and Button */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Find Your Dream Home with Rent4Me
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover a wide range of apartments and houses waiting just for you!
          </p>
          <Link to="/add-apartment" className="inline-block py-3 px-6 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition-all">
            Add Apartment
          </Link>
        </div>
      </section>

      {/* Available Apartments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Available Apartments</h2>

          {/* Loading and Error Handling */}
          {loading && <div>Loading apartments...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {/* No Apartments Found */}
          {!loading && !error && filteredApartments.length === 0 && (
            <div>No apartments found for your search.</div>
          )}

          {/* Apartment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredApartments.length > 0 ? (
              filteredApartments.map((apartment, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200">
                  <img
                    src={apartment.imageUrl || 'https://essexmeadows.com/wp-content/uploads/shutterstock_630857810-1.jpg'}  // Fallback to a default image if not provided
                    alt={apartment.title || 'Apartment Image'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{apartment.title || 'No title available'}</h3>
                    <p className="text-lg text-gray-600 mb-4">${apartment.price || 'Price not available'}</p>
                    <p className="text-sm text-gray-500 mb-4">{apartment.location || 'Location not available'}</p>
                    <Link
                      to={`/apartmentdetail/${apartment.id}`} 
                      className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div>No apartments available.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
