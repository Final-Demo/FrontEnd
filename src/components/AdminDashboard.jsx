import React, { useState, useEffect } from "react";

// Loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin border-4 border-t-4 border-blue-500 w-16 h-16 border-solid rounded-full"></div>
  </div>
);

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const propertiesPerPage = 5;

  // Fetch data from an API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Simulated API call - Replace with real API endpoint
        const mockData = [
          {
            id: 1,
            title: "Luxury Villa",
            owner: "John Doe",
            address: "123 Palm Street, Beverly Hills",
            price: 1000000,
            status: "Pending",
            description: "A spacious luxury villa with a private pool and garden.",
          },
          {
            id: 2,
            title: "Modern Apartment",
            owner: "Jane Smith",
            address: "456 Sunset Avenue, Miami",
            price: 500000,
            status: "Approved",
            description: "A fully furnished modern apartment near the beach.",
          },
          {
            id: 3,
            title: "Cozy Cottage",
            owner: "Emily Johnson",
            address: "789 Oak Lane, Vermont",
            price: 200000,
            status: "Rejected",
            description: "A charming cottage in the countryside.",
          },
        ];
        setProperties(mockData);
        setFilteredProperties(mockData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Search Functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProperties(properties);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(lowerCaseQuery) ||
          property.owner.toLowerCase().includes(lowerCaseQuery) ||
          property.address.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProperties(filtered);
    }
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination Logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Actions
  const handleApprove = (id) => {
    updatePropertyStatus(id, "Approved");
  };

  const handleReject = (id) => {
    updatePropertyStatus(id, "Rejected");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setDeleting(true);
      setProperties((prev) => prev.filter((property) => property.id !== id));
      setFilteredProperties((prev) => prev.filter((property) => property.id !== id));
      alert("Property Deleted!");
      setDeleting(false);
    }
  };

  const updatePropertyStatus = (id, status) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, status } : property
      )
    );
    setFilteredProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, status } : property
      )
    );
    alert(`Property ${status}!`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard - Manage Properties
      </h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title, owner, or address..."
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Table */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Owner</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Address</th>
                <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-600">Price</th>
                <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-2 border-b text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="text-indigo-500 hover:underline"
                    >
                      {property.title}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{property.owner}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{property.address}</td>
                  <td className="px-4 py-2 border-b text-center text-sm text-gray-700">
                    ${property.price.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 border-b text-center text-sm font-semibold ${
                      property.status === "Pending"
                        ? "text-yellow-500"
                        : property.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {property.status}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {property.status === "Pending" && (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(property.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(property.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => handleDelete(property.id)}
                      disabled={deleting || loading}
                      className="mt-2 px-3 py-1 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedProperty && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedProperty.title}</h2>
            <p className="text-gray-700">
              <strong>Owner:</strong> {selectedProperty.owner}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {selectedProperty.address}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {selectedProperty.description}
            </p>
            <p className="text-gray-700">
              <strong>Price:</strong> ${selectedProperty.price.toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedProperty.status === "Pending"
                    ? "text-yellow-500"
                    : selectedProperty.status === "Approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {selectedProperty.status}
              </span>
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProperty(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
