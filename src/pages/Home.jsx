import React, { useState } from "react";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("apartments");

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold text-gray-800">Property Finder</h1>
          <div className="flex space-x-6">
            <button
              onClick={() => setSelectedCategory("apartments")}
              className={`text-lg font-medium ${
                selectedCategory === "apartments"
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              Apartments
            </button>
            <button
              onClick={() => setSelectedCategory("rooms")}
              className={`text-lg font-medium ${
                selectedCategory === "rooms" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => setSelectedCategory("houses")}
              className={`text-lg font-medium ${
                selectedCategory === "houses" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Houses
            </button>
            <button
              onClick={() => setSelectedCategory("studios")}
              className={`text-lg font-medium ${
                selectedCategory === "studios" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Studios
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('./src/assets/image/RentbgImg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Accomodation</h1>
            <input
              type="text"
              className="w-4/5 sm:w-1/2 lg:w-1/3 px-4 py-3 rounded-full text-xl text-cyan-700"
              placeholder="Search for properties..."
            />
          </div>
        </div>
      </section>

      {/* Available Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Available Properties for Rent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Property Cards */}
            {propertiesData[selectedCategory].map((property, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{property.price}</p>
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

// Sample data for properties (Replace with your dynamic data)
const propertiesData = {
  apartments: [
    { title: "Luxury Apartment in Downtown", price: "$2,500/month", image: "/path/to/apartment1.jpg" },
    { title: "Spacious 2 Bedroom Apartment", price: "$1,800/month", image: "/path/to/apartment2.jpg" },
  ],
  rooms: [
    { title: "Cozy Room with City View", price: "$800/month", image: "/path/to/room1.jpg" },
    { title: "Modern Room Near the Park", price: "$1,000/month", image: "/path/to/room2.jpg" },
  ],
  houses: [
    { title: "Beautiful 3 Bedroom House", price: "$3,500/month", image: "/path/to/house1.jpg" },
    { title: "Family House with Garden", price: "$2,200/month", image: "/path/to/house2.jpg" },
  ],
  studios: [
    { title: "Compact Studio Near Subway", price: "$1,200/month", image: "/path/to/studio1.jpg" },
    { title: "Charming Studio in Quiet Neighborhood", price: "$1,500/month", image: "/path/to/studio2.jpg" },
  ],
};

export default App;
