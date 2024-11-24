import React, { useEffect, useState } from 'react';

// A simple spinner component for loading state
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin border-4 border-t-4 border-blue-500 w-16 h-16 border-solid rounded-full"></div>
  </div>
);

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function would typically fetch data from the backend.
  const fetchAboutUsData = async () => {
    try {
      // Simulating fetched data for now
      const data = {
        title: "About Rent4Me",
        description: "Rent4Me is a leading real estate platform that connects people with the perfect properties to rent or buy. We provide a seamless experience for both landlords and tenants through our user-friendly platform.",
        mission: "Our mission is to make renting properties easier, faster, and more transparent for everyone. We believe in empowering people with the right tools to find their next home.",
        vision: "To be the most trusted and innovative real estate platform that revolutionizes the way people rent and lease properties globally.",
        team: [
          { name: "John Doe", role: "CEO", image: "/images/team/john.jpg" },
          { name: "Jane Smith", role: "CTO", image: "/images/team/jane.jpg" },
          { name: "Alice Johnson", role: "Marketing Lead", image: "/images/team/alice.jpg" },
        ]
      };

      setAboutUsData(data);
      setLoading(false);  // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching About Us data:", error);
      setError("Failed to load data. Please try again later.");
      setLoading(false);  // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  if (loading) {
    return (
      <div className="about-us-container bg-gray-100 p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-us-container bg-gray-100 p-8">
        <p className="text-red-500 text-center font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="about-us-container bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">{aboutUsData.title}</h1>

      <p className="text-lg text-gray-700 mt-4">{aboutUsData.description}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-500">Mission</h2>
        <p className="text-lg text-gray-700">{aboutUsData.mission}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-500">Vision</h2>
        <p className="text-lg text-gray-700">{aboutUsData.vision}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-500">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {aboutUsData.team.map((member, index) => (
            <div key={index} className="team-member text-center">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
