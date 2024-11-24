import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from localStorage (or sessionStorage or context)
        const token = localStorage.getItem('authToken'); // Replace with the correct token location

        if (!token) {
          throw new Error('Authentication token is missing. Please log in.');
        }

        // Fetch user data from the API with the token
        const response = await fetch('https://backend-xl0o.onrender.com/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token to Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
        setFormData(data); // Populate form data with fetched user data

        // Set the profile image URL if available
        if (data.profilePicture) {
          setProfilePicture(data.profilePicture);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle image file selection for profile picture
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle form data changes (for name, email, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save updated profile data
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');  // Get token again

      const response = await fetch('https://backend-xl0o.onrender.com/user', {
        method: 'PUT',  // Assuming PUT for update
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setFormData(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h3 className="text-xl font-semibold">Profile</h3>
      <button
        onClick={toggleEditMode}
        className="mt-2 text-blue-500 hover:text-blue-700"
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>

      <form onSubmit={handleSave} className="space-y-4 mt-4">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-4">
          <label htmlFor="profilePicture" className="w-32 text-gray-700">Profile Picture</label>
          <div className="flex items-center space-x-4">
            {profilePicture ? (
              <img
                src={'https://savefiles.org/${profileData.avatar}?shareable_link=559'}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">No Image</span>
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Other Fields */}
        <div className="flex items-center space-x-4">
          <label htmlFor="firstName" className="w-32 text-gray-700">First Name</label>
          {isEditing ? (
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.firstName}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="lastName" className="w-32 text-gray-700">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.lastName}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="w-32 text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="phoneNumber" className="w-32 text-gray-700">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.phoneNumber}</p>
          )}
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
