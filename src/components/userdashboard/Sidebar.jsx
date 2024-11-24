// Sidebar.jsx
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faHome, faMapMarkedAlt, faStar, faCreditCard, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen shadow-lg fixed top-0 left-0 z-10">
      <div className="flex flex-col p-6">
        <h2 className="text-xl font-semibold text-center text-yellow-500 mb-8">Dashboard</h2>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faTachometerAlt} className="text-lg" />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="ml-4">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/my-apartments" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faHome} className="text-lg" />
                <span className="ml-4">My Apartments</span>
              </Link>
            </li>
            <li>
              <Link to="/site-visits" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="text-lg" />
                <span className="ml-4">Site Visits</span>
              </Link>
            </li>
            <li>
              <Link to="/interest" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faStar} className="text-lg" />
                <span className="ml-4">Interest Requests</span>
              </Link>
            </li>
            <li>
              <Link to="/payment-history" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faCreditCard} className="text-lg" />
                <span className="ml-4">Payment History</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <FontAwesomeIcon icon={faCog} className="text-lg" />
                <span className="ml-4">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;