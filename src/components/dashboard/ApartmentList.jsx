import React, { useState, useEffect } from 'react';
import { FaTh, FaList, FaHeart } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios'; // For API requests

// Child Component: Search and Filter
const SearchAndFilter = ({ search, setSearch, priceFilter, setPriceFilter, bedroomFilter, setBedroomFilter }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search by name or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-1/3"
      />
      <div className="flex space-x-4">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Price Range</option>
          <option value="100000">Under $100,000</option>
          <option value="300000">Under $300,000</option>
          <option value="500000">Under $500,000</option>
        </select>

        <select
          value={bedroomFilter}
          onChange={(e) => setBedroomFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
        </select>
      </div>
    </div>
  );
};

// Child Component: View Mode Toggle
const ViewModeToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex space-x-4 items-center">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
      >
        <FaTh size={24} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
      >
        <FaList size={24} />
      </button>
    </div>
  );
};

// Child Component: Property Card
const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  const imageUrl = property.image || 'https://savefiles.org/secure/uploads/21045?shareable_link=511';

  return (
    <Link
      to={`/apartdetail/${property.id}`} // Link to the ApartmentDetail page with the apartment id
      className="bg-white rounded-lg shadow-lg"
    >
      <img
        src={imageUrl}
        alt={property.name}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl">{property.name}</h3>
        <p className="text-gray-500">{property.location}</p>
        <p className="text-green-600 font-semibold">${property.price.toLocaleString()}</p>
        <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>

        {/* Add to Favourite Button (Heart Icon) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(property.id, isFavourite);
          }}
          className={`text-xl ${isFavourite ? 'text-red-500' : 'text-gray-500'}`}
        >
          <FaHeart />
        </button>
      </div>
    </Link>
  );
};

// Child Component: Loading Indicator
const LoadingIndicator = () => {
  return <div className="text-center">Loading properties...</div>;
};

// Child Component: Error Message
const ErrorMessage = ({ error }) => {
  return <div className="text-red-500 text-center mb-6">{error}</div>;
};

const ApartmentList = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]); // State for favourites

  // Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://backend-xl0o.onrender.com/apartments');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch favourites
  const fetchFavourites = async () => {
    try {
      const response = await axios.get('/api/favourites');
      
      // Ensure the response is an array and map over it
      if (Array.isArray(response.data)) {
        setFavourites(response.data.map(fav => fav.id)); // Assuming the response has 'id' property
      } else {
        console.error('Unexpected format for favourites:', response.data);
        setFavourites([]);
      }
    } catch (err) {
      console.error('Error fetching favourites:', err);
    }
  };

  // Toggle favourite status
  const handleToggleFavourite = async (apartmentId, isFavourite) => {
    try {
      if (isFavourite) {
        // Remove from favourites
        await axios.delete(`/api/favourite/${apartmentId}`);
        setFavourites(favourites.filter(id => id !== apartmentId));
      } else {
        // Add to favourites
        await axios.post('/api/favourite', { apartmentId });
        setFavourites([...favourites, apartmentId]);
      }
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProperties();
    fetchFavourites(); // Fetch favourites after properties are fetched
  }, []);

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      (property.name && property.name.toLowerCase().includes(search.toLowerCase())) ||
      (property.location && property.location.toLowerCase().includes(search.toLowerCase()));
  
    const matchesPrice = priceFilter ? property.price <= priceFilter : true;
    const matchesBedrooms = bedroomFilter ? property.bedrooms >= bedroomFilter : true;
  
    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">Property Listings</h1>
      </header>

      {/* Search and Filter Section */}
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        bedroomFilter={bedroomFilter}
        setBedroomFilter={setBedroomFilter}
      />

      {/* View Mode Toggle */}
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      {/* Error message */}
      {error && <ErrorMessage error={error} />}

      {/* Loading indicator */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'space-y-6'}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavourite={favourites.includes(property.id)} // Check if the property is a favourite
                onToggleFavourite={handleToggleFavourite}
              />
            ))
          ) : (
            <p>No apartments found.</p>
          )}
        </div>
      )}

      <main>{children}</main>
    </div>
  );
};

export default ApartmentList;
