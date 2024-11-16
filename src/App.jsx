import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ApartmentListing from './components/ApartmentListing';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import DashboardSettings from './pages/DashboardSettings';
import ApartmentDetails from './components/ApartmentDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard route with nested routes */}
        <Route path="/dashboard" element={<UserDashboardLayout />}>
          {/* Nested route for settings */}
          <Route path="settings" element={<DashboardSettings />} />

          {/* Apartment listing route */}
          <Route path="apartmentlist" element={<ApartmentListing />} />

          {/* Nested route for apartment details with dynamic id */}
          <Route path="apartmentdetail/:id" element={<ApartmentDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
