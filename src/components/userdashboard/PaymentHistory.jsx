// PaymentHistory.jsx
const PaymentHistory = () => {
    const payments = [
      { id: 1, description: 'Rent Payment for Nov 2024', amount: 2500, status: 'Completed' },
      { id: 2, description: 'Commitment Fee for Cozy 1-Bedroom', amount: 200, status: 'Pending' },
    ];
  
    return (
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment History</h2>
  
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-gray-50 shadow-md rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{payment.description}</h3>
                  <p className="text-sm text-gray-600">Amount: ${payment.amount}</p>
                  <p className="text-sm text-gray-600">Status: {payment.status}</p>
                </div>
  
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentHistory;
  