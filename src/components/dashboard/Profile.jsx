// components/dashboard/Profile.js
import React, { useState } from 'react';  // Add useState here

const Profile = () => {
  // Sample user data state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Hometown, USA',
  });

  // State for the profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      // Generate a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl); // Set image URL for preview
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle form data change (for name, email, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save the updated profile
  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

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
                src={profilePicture}
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

        {/* Name Field */}
        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="w-32 text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        {/* Email Field */}
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

        {/* Phone Field */}
        <div className="flex items-center space-x-4">
          <label htmlFor="phone" className="w-32 text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="flex items-center space-x-4">
          <label htmlFor="address" className="w-32 text-gray-700">Address</label>
          {isEditing ? (
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p>{user.address}</p>
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
