import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "qwekukhalid266@gmail.com",
    password: "hello12345",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("https://backend-xl0o.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        toast.success("Login successful! Redirecting to home...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "Invalid email or password");
        setErrors({ login: "Invalid email or password" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white p-8 rounded-lg shadow-lg w-[80%] max-w-4xl">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-1/3 flex justify-center items-center">
          <img
            src="" // Replace with your logo path
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          
          {errors.login && <p className="text-red-500 text-center mb-4">{errors.login}</p>}

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </div>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:text-indigo-800">
              Register here
            </a>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
