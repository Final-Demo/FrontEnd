import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "qwekukhalid266@gmail.com", // Replace with initial empty value if needed
    password: "hello12345", // Replace with initial empty value if needed
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
        localStorage.setItem("authToken", data.token); // Save token in localStorage
        toast.success("Login successfull...");
        
        // Redirect to /home2 after a successful login
        setTimeout(() => {
          navigate("/home2"); // Redirect to /home2 page
        }, 2000); // You can adjust the delay if needed
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
    <div className="flex  justify-center items-center min-h-screen bg-white">
      <div className="flex bg-cyan-400 p-8 rounded-3xl shadow-xl w-[60%] max-w-4xl">
        {/* Logo Section */}
        <div className="flex-shrink-0 w-1/3 flex justify-center items-center">
          <img 
            src="./src/assets/images/rent4melogo.jpg" // Replace with your logo path
            alt="Logo"
            className="w-36 h-88 object-contain rounded-3xl shadow-orange-600"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-1/2 ml-8 p-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          
          {errors.login && <p className="text-red-500 text-center mb-4">{errors.login}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black">
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
              <label htmlFor="password" className="block text-sm font-medium text-black">
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
            <a href="/forgot-password" className="text-white hover:text-white text-bold">
              Forgot your password?
            </a>
          </div>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-white hover:text-indigo-800">
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
