import React from "react";
import { Link } from "react-router-dom"; // For linking to pages within the app
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Correct import

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Left Column: About Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-200">
              We provide the best properties to rent, buy, and sell in your area. Discover your dream home today!
            </p>
          </div>

          {/* Middle Column: Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline text-gray-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline text-gray-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline text-gray-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Social Media Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Call to Action and Newsletter */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <p className="text-lg text-gray-100 mb-4">
            Ready to find your dream property? Join our community today!
          </p>
          <Link
            to="/signup"
            className="inline-block py-3 px-6 bg-purple-700 rounded-lg text-white font-semibold hover:bg-purple-800 transition-all"
          >
            Join Now
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
