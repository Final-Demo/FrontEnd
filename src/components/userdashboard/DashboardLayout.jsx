// UserDashboardLayout.jsx
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faHome, faCog, faSignOutAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen shadow-lg fixed top-0 left-0 z-10">
        <div className="flex flex-col p-6">
          <h2 className="text-2xl font-bold text-center text-yellow-500 mb-8">User Dashboard</h2>

          {/* Sidebar Navigation */}
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
                <Link to="/mybookings" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                  <FontAwesomeIcon icon={faHome} className="text-lg" />
                  <span className="ml-4">My Apartments</span>
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                  <FontAwesomeIcon icon={faChartLine} className="text-lg" />
                  <span className="ml-4">Analytics</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                  <FontAwesomeIcon icon={faCog} className="text-lg" />
                  <span className="ml-4">Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                  <span className="ml-4">Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, User</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-200">Profile</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200">Notifications</button>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600">Get a quick view of your account stats.</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-3xl text-yellow-500 font-semibold">230</div>
              <div className="text-sm text-gray-500">Total Apartments</div>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="space-y-4 text-gray-600">
              <li>Viewed Apartment: Oceanview 102</li>
              <li>Scheduled a site visit</li>
              <li>Payment received for rental</li>
            </ul>
          </div>

          {/* Card 3: Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <ul className="space-y-4 text-gray-600">
              <li>Your site visit is confirmed for tomorrow.</li>
              <li>New interest request for your apartment.</li>
            </ul>
          </div>
        </div>

        {/* Dynamic Content (Children) */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
