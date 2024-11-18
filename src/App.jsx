import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ApartmentList from "./components/dashboard/ApartmentList";
import ApartmentDetails from "./components/dashboard/ApartmentDetails"; 
import UserDashboard from "./components/dashboard/UserDashboard"; 
import SearchBar from "./components/search/SearchBar";
import FilterSidebar from "./components/search/FilterSidebar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorMessage from "./components/common/ErrorMessage";
import SuccessMessage from "./components/common/SuccessMessage";
import Modal from "./components/common/Modal";
import DashboardLayout from "./layout/DashboardLayout";

// AppContent will handle rendering the routes and conditional layout
const AppContent = () => {
  const location = useLocation(); // Get current route location

  // Check if the current route is a dashboard-related route or login/register
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/apartmentlist');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Conditionally render Header and Navbar only for non-login, non-register, and non-dashboard routes */}
      {!isDashboardRoute && !isAuthRoute && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Layout (without Header, Navbar, and Footer) */}
        <Route path="/dashboardlay" element={<DashboardLayout />} />

        {/* Apartment List */}
        <Route path="/apartmentlist" element={<ApartmentList />} />

        {/* Apartment Details */}
        <Route path="/apartmentdetail/:id" element={<ApartmentDetails />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Dashboard */}
        <Route path="/udashboard" element={<UserDashboard />} />

        {/* Search Routes */}
        <Route path="/search" element={<div><SearchBar /><FilterSidebar /></div>} />

        {/* Common Components */}
        <Route path="/loading" element={<LoadingSpinner />} />
        <Route path="/error" element={<ErrorMessage />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>

      {/* Conditionally render Footer only for non-login, non-register, and non-dashboard routes */}
      {!isDashboardRoute && !isAuthRoute && <Footer />}
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
