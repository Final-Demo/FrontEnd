import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";  // Ensure this is the updated Navbar with the profile dropdown
import Navbar2 from "./components/Navbar2"; // Import the new Navbar2
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Home2 from "./components/Home2"; // Import the Home2 component
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ApartmentList from "./components/dashboard/ApartmentList";
import ApartmentDetails from "./components/dashboard/ApartmentDetails";
import UserDashboard from "./components/dashboard/UserDashboard";
import Dashboard from "./components/dashboard/Dashboard"; // Import your new Dashboard component
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorMessage from "./components/common/ErrorMessage";
import SuccessMessage from "./components/common/SuccessMessage";
import Modal from "./components/common/Modal";
import DashboardLayout from "./layout/DashboardLayout";
import AboutUsPage from "../src/layout/AboutUs"; // Import About Us Page
import AddApartment from "./pages/AddApartment";
import EmailVerification from "../src/components/auth/EmailVerification"; // Import the email verification component

const AppContent = () => {
  const location = useLocation(); // Get current route location

  // Define routes where Navbar and Footer should NOT appear (e.g., authentication and dashboard routes)
  const noNavbarFooterRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/dashboardlay',
    '/dashboard',
    '/udashboard', // Add all dashboard-related routes here
  ];

  // Check if the current route should not show Navbar or Footer
  const shouldHideNavbarFooter = noNavbarFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {/* Conditionally render Header only for Home page */}
      {location.pathname === '/' && <Header />}

      {/* Conditionally render Navbar2 only for Home2 */}
      {location.pathname === '/home2' ? <Navbar2 /> : !shouldHideNavbarFooter && <Navbar />}

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />  {/* Add Home2 route */}

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* About Us Route */}
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Dashboard Layout (without Header, Navbar, and Footer) */}
        <Route path="/dashboardlay" element={<DashboardLayout />} />

        {/* Apartment List */}
        <Route path="/apartmentlist" element={<ApartmentList />} />

        {/* Apartment Details */}
        <Route path="/apartmentdetail/:id" element={<ApartmentDetails />} />

        {/* Add Apartment Route */}
        <Route path="/add-apartment" element={<AddApartment />} />

        {/* User Dashboard */}
        <Route path="/udashboard" element={<UserDashboard />} />

        {/* New Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* New Dashboard Route */}

        {/* Email Verification Route */}
        <Route path="/verify-email/:token" element={<EmailVerification />} />

        {/* Common Components */}
        <Route path="/loading" element={<LoadingSpinner />} />
        <Route path="/error" element={<ErrorMessage />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>

      {/* Conditionally render Footer only for non-login, non-register, and non-dashboard routes */}
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
};

// Main App Component with Router setup
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
