import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigating after registration
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // To navigate after successful registration

  // Handle input changes
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
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
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

    setLoading(true); // Show loading spinner

    try {
      const response = await fetch("https://backend-xl0o.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      const data = await response.json();

      // Log the response from the API
      console.log("API Response:", data); // <-- Log the response here

      if (response.ok) {
        // Registration successful
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000); // Wait for 2 seconds before navigating
      } else {
        // Registration failed, show error message from the response
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="flex justify-center items-center bg-white p-4">
      <div className="bg-cyan-400 p-8 rounded-3xl shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl md:text-2xl font-semibold text-center text-gray-800 mb-8">Create Your Account</h2>

        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <p key={index} className="text-red-500 text-center mb-4">{error}</p>
        ))}

        <form onSubmit={handleSubmit}>
          {/* First Name field */}
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-lg font-medium text-black">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name field */}
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-lg font-medium text-black">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-black">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-black">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
            />
          </div>

          {/* Phone Number field */}
          <div className="mb-8">
            <label htmlFor="phoneNumber" className="block text-lg font-medium text-black">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 disabled:bg-gray-400"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Optional: Link to the Login page */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:text-black">
            Login here
          </a>
        </p>
      </div>

      {/* Toast container to show toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
