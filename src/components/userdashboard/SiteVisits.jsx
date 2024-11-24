// SiteVisits.jsx
const SiteVisits = () => {
    const siteVisits = [
      { id: 1, apartmentTitle: 'Luxury 2-Bedroom', date: '2024-12-01', location: 'New York, NY' },
      { id: 2, apartmentTitle: 'Cozy 1-Bedroom', date: '2024-12-05', location: 'Los Angeles, CA' },
    ];
  
    return (
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Site Visits</h2>
  
          <div className="space-y-4">
            {siteVisits.map((visit) => (
              <div key={visit.id} className="bg-gray-50 shadow-md rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{visit.apartmentTitle}</h3>
                  <p className="text-sm text-gray-600">{visit.location}</p>
                  <p className="text-lg font-semibold text-gray-800">Scheduled for: {visit.date}</p>
                </div>
  
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200">
                  Cancel Visit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SiteVisits;
  