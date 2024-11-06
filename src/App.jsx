import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar component
import Home from './pages/Home';          // Import Home page
import Auth from './pages/Auth';
import AddPropertyForm from './components/properties/AddPropertyForm';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import MyProperties from './components/dashboard/MyProperties';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      {/* Navbar appears at the top of the page */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/addproperty" element={<AddPropertyForm />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} /> {/* Nested Profile route */}
            <Route path="myproperties" element={<MyProperties />} /> {/* Nested MyProperties route */}
          </Route>
        </Routes>
      </div>

      {/* Footer appears at the bottom of the page on all routes */}
      <Footer />
    </Router>
  );
}

export default App;
