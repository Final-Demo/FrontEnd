import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    try {
      const response = await fetch("https://backend-xl0o.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="flex flex-col md:flex-row bg-cyan-400 p-6 rounded-3xl shadow-xl w-full max-w-4xl">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
          <img
            src="./src/assets/images/rent4melogo.jpg" // Replace with your logo path
            alt="Logo"
            className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-3xl shadow-orange-600"
          />
        </div>

        {/* Register Form Section */}
        <div className="w-full md:w-2/3 md:ml-8 p-4">
          <h2 className="text-3xl md:text-2xl font-semibold text-center mb-6 text-gray-800">Create Your Account</h2>

          {/* Display error messages */}
          {Object.values(errors).map((error, index) => (
            <p key={index} className="text-red-500 text-center mb-4">{error}</p>
          ))}

          <form onSubmit={handleSubmit}>
            {/* First Name field */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name field */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your email"
              />
            </div>

            {/* Password field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your password"
              />
            </div>

            {/* Phone Number field */}
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Link to Login page */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-white hover:text-indigo-800">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
