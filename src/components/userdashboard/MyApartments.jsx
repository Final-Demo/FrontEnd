// MyApartments.jsx
const MyApartments = () => {
    const apartments = [
      { id: 1, title: 'Luxury 2-Bedroom Apartment', location: 'New York, NY', price: 2500 },
      { id: 2, title: 'Cozy 1-Bedroom Apartment', location: 'Los Angeles, CA', price: 1800 },
    ];
  
    return (
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Apartments</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment) => (
              <div key={apartment.id} className="bg-gray-50 shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold text-gray-800">{apartment.title}</h3>
                <p className="text-sm text-gray-600">{apartment.location}</p>
                <p className="text-lg font-semibold text-gray-800">${apartment.price}/month</p>
  
                <div className="mt-4 flex space-x-4">
                  <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
                    View Details
                  </button>
                  <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200">
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MyApartments;
  