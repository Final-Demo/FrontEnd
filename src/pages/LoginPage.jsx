import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigating after login
import { toast, ToastContainer } from "react-toastify"; // Correct imports
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "qwekukhalid266@gmail.com",
    password: "hello12345",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To show a loading state while submitting
  const navigate = useNavigate(); // To navigate after successful login

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await fetch("https://backend-xl0o.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      const data = await response.json();

      // Log the response for debugging
      console.log("API Response:", data);

      if (response.ok) {
        // If login is successful, show success toast
        toast.success("Login successful! Redirecting to dashboard...");

        // Store token or other user data (if needed)
        // Example: localStorage.setItem("token", data.token);

        // Redirect to dashboard after 2 seconds (allowing the toast to show)
        setTimeout(() => {
          navigate("/dashboardlay");
        }, 2000); // Redirect after 2 seconds
      } else {
        // If login fails, show error toast with message from API
        toast.error(data.message || "Invalid email or password");
        setErrors({ login: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state after request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Display error messages */}
        {errors.login && <p className="text-red-500 text-center mb-4">{errors.login}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Optional: Link to the Register page */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:text-indigo-800">
            Register here
          </a>
        </p>
      </div>

      {/* Toast container to show toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
