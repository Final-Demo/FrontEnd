import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you will use React Router
import { toast } from "react-toastify"; // Import the toast function from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS for the toasts

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match"); // Show error toast
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for password reset
      // Replace with actual API call to reset password using the token
      const response = await fakeApiCall(token, password);
      toast.success("Your password has been reset successfully."); // Success toast
    } catch (err) {
      toast.error("Failed to reset password. Please try again."); // Error toast
    } finally {
      setLoading(false);
    }
  };

  // Simulated API call
  const fakeApiCall = (token, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === "valid-token") {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
