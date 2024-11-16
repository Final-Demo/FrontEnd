import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import scroll icons
import { apiGetApartments } from '../services/apartments'; // Import the API function

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('apartments');
  const [apartments, setApartments] = useState([]); // State to hold fetched apartments
  const [filteredApartments, setFilteredApartments] = useState([]); // State for filtered apartments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const containerRef = useRef(null); // Reference to the scrolling container

  // Fetch apartments from API when the category changes or component mounts
  useEffect(() => {
    const fetchApartments = async () => {
      setLoading(true); // Set loading state to true before fetching
      setError(null); // Reset any previous errors

      try {
        const response = await apiGetApartments(); // Fetch data from API
        console.log(response); // Log the response to see the data structure
        setApartments(response); // Set apartments to state (assuming the response is the apartment array)
        setFilteredApartments(response); // Initially show all apartments
      } catch (err) {
        setError('Failed to fetch apartments. Please try again later.'); // Set error message if fetch fails
        console.error(err); // Log the error for debugging
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
        apartment.title.toLowerCase().includes(query) || // Filter by title
        apartment.location.toLowerCase().includes(query) // Filter by location
    );

    setFilteredApartments(filtered); // Update filtered apartments state
  };

  // Handle "All Properties" button click
  const handleAllProperties = () => {
    setSearchQuery(''); // Clear the search query
    setFilteredApartments(apartments); // Show all apartments
  };

  // Scroll left
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Scroll right
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold text-gray-800">Apartment Finder</h1>
          <div className="flex space-x-6">
            <button
              onClick={() => setSelectedCategory('apartments')}
              className={`text-lg font-medium ${selectedCategory === 'apartments' ? 'text-blue-500' : 'text-gray-600'}`}
            >
              Apartments
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Horizontal Scrolling */}
      <section className="relative w-full h-[100vh] overflow-hidden"> {/* Increased height to 100vh */}
        <div className="flex space-x-4 overflow-x-auto pb-4" ref={containerRef}>
          {/* Add image URLs for scrolling */}
          <div className="flex-shrink-0 w-full h-full">
            <img
              src="https://images1.apartmenthomeliving.com/i2/zLezrt4pWD8kLjXJJMsNKMBE2HXDwBi7Le8lN-rVOiA/114/image.jpg?p=1"
              alt="Hero 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-shrink-0 w-full h-full">
            <img
              src="https://images1.apartmenthomeliving.com/i2/rBUWzEYqXSIQgVFfnaa_Tiwbg9-6GiPO7hBPPBKIiS0/113/image.jpg?p=1"
              alt="Hero 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-shrink-0 w-full h-full">
            <img
              src="https://images1.apartmenthomeliving.com/i2/eGl7B94pVoXxmlGWYQd4CYjbDINzzSlwaBaPzYaIQQ0/113/image.jpg?p=1"
              alt="Hero 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-shrink-0 w-full h-full">
            <img
              src="https://via.placeholder.com/1200x600/FF33A6/FFFFFF?text=Image+4"
              alt="Hero 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollLeft}
            className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900"
          >
            <FaChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button
            onClick={scrollRight}
            className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Overlay for text */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6 md:px-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Accommodation</h1>
            <input
              type="text"
              className="w-4/5 sm:w-1/2 lg:w-1/3 px-4 py-3 rounded-full text-xl text-cyan-700"
              placeholder="Search for apartments..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              onClick={handleAllProperties}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Available Apartments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
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
            {filteredApartments.map((apartment, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`https://savefiles.org/secure/uploads/21045?shareable_link=511/${apartment.images[0]}`} // Use the first image from the images array
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{apartment.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">${apartment.price}</p>
                  <p className="text-sm text-gray-500 mb-4">{apartment.location}</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
