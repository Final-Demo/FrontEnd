import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar"; // Import the Sidebar component
import { Bar } from "react-chartjs-2"; // Import Chart.js for the bar chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Track sidebar state

  const propertiesPerPage = 5;

  // Simulated data (replace with actual API calls)
  const users = {
    tenants: 100,
    landlords: 50,
  };

  const bookings = [12, 7, 15, 30, 20, 25, 35]; // Example bookings per week

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Bookings per Week',
        data: bookings,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      // Simulated API call
      const mockData = [
        { id: 1, title: "Luxury Villa", owner: "John Doe", address: "123 Palm Street", price: 1000000, status: "Pending", description: "Luxury villa" },
        { id: 2, title: "Modern Apartment", owner: "Jane Smith", address: "456 Sunset Avenue", price: 500000, status: "Approved", description: "Modern apartment" },
        { id: 3, title: "Cozy Cottage", owner: "Emily Johnson", address: "789 Oak Lane", price: 200000, status: "Rejected", description: "Cozy cottage" },
      ];
      setTimeout(() => {
        setProperties(mockData);
        setFilteredProperties(mockData);
        setLoading(false);
      }, 1000);
    };
    fetchProperties();
  }, []);

  // Search functionality
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

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Actions for property management
  const handleApprove = (id) => updatePropertyStatus(id, "Approved");
  const handleReject = (id) => updatePropertyStatus(id, "Rejected");
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((property) => property.id !== id));
      setFilteredProperties((prev) => prev.filter((property) => property.id !== id));
      alert("Property Deleted!");
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
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          sidebarExpanded ? 'w-64' : 'w-20'
        }`}
      >
        <Sidebar sidebarExpanded={sidebarExpanded} toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} /> {/* Sidebar positioned to the left */}
      </div>

      {/* Main Content */}
      <div
        className={`ml-${sidebarExpanded ? '64' : '20'} w-full transition-all duration-300`} // Adjust content width based on sidebar state
      >
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Admin Dashboard - Manage Properties
          </h1>

          {/* Cards Section */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Cards content */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All Apartments</h2>
                <p className="text-2xl">{properties.length}</p>
              </div>
              <i className="fas fa-home text-4xl text-blue-500"></i>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All Users</h2>
                <p className="text-2xl">{users.tenants + users.landlords}</p>
              </div>
              <i className="fas fa-users text-4xl text-green-500"></i>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All Bookings</h2>
                <p className="text-2xl">{bookings.reduce((acc, val) => acc + val, 0)}</p>
              </div>
              <i className="fas fa-calendar-check text-4xl text-yellow-500"></i>
            </div>
          </div>

          {/* Bar Chart for Bookings */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Bookings Overview</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>

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

          {/* Table for Properties */}
          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading properties...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr>
                    {/* Table Header */}
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Title</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Owner</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Address</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProperties.map((property) => (
                    <tr key={property.id}>
                      <td className="px-4 py-2 border-b text-sm">{property.title}</td>
                      <td className="px-4 py-2 border-b text-sm">{property.owner}</td>
                      <td className="px-4 py-2 border-b text-sm">{property.address}</td>
                      <td className="px-4 py-2 border-b text-sm">${property.price}</td>
                      <td className="px-4 py-2 border-b text-sm">{property.status}</td>
                      <td className="px-4 py-2 border-b text-sm">
                        <button
                          onClick={() => handleApprove(property.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(property.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
