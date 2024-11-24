// InterestRequests.jsx
const InterestRequests = () => {
    const requests = [
      { id: 1, apartmentTitle: 'Modern Loft', status: 'Pending' },
      { id: 2, apartmentTitle: 'Beachfront Condo', status: 'Confirmed' },
    ];
  
    return (
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Interest Requests</h2>
  
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-gray-50 shadow-md rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{request.apartmentTitle}</h3>
                  <p className="text-sm text-gray-600">Status: {request.status}</p>
                </div>
  
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                  {request.status === 'Pending' ? 'Confirm Interest' : 'Withdraw Interest'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default InterestRequests;
  