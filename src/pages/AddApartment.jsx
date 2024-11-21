const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  // Validate that required fields are filled
  if (
    !formData.title ||
    !formData.description ||
    !formData.location ||
    !formData.price ||
    formData.images.length === 0
  ) {
    setLoading(false);
    setError('Please fill out all required fields.');
    return;
  }

  try {
    const formPayload = new FormData();

    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('location', formData.location);
    formPayload.append('price', formData.price);
    formPayload.append('category', formData.category);
    formPayload.append('status', formData.status);
    formPayload.append('isApproved', formData.isApproved);

    // Add amenities
    formData.amenities.forEach((amenity, index) => {
      formPayload.append(`amenities[${index}]`, amenity);
    });

    // Add features
    Object.keys(formData.features).forEach((key) => {
      formPayload.append(`features[${key}]`, formData.features[key]);
    });

    // Add images
    formData.images.forEach((image) => {
      formPayload.append('images', image);
    });

    // Get the token from localStorage or sessionStorage (assuming JWT)
    const token = localStorage.getItem('authToken'); // or sessionStorage, depending on your implementation

    if (!token) {
      setLoading(false);
      setError('You are not logged in. Please log in and try again.');
      return;
    }

    // Send the POST request with the token in the Authorization header
    const { data } = await axios.post(
      'https://backend-xl0o.onrender.com/apartments',
      formPayload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        },
      }
    );

    setLoading(false);
    setSuccess('Apartment added successfully!');
    setFormData({
      title: '',
      description: '',
      location: '',
      price: '',
      images: [],
      category: 'apartment',
      amenities: [],
      status: 'available',
      features: {
        isFurnished: false,
        isParkingAvailable: false,
        isAirConditionerAvailable: false,
      },
      isApproved: false,
    });
  } catch (error) {
    setLoading(false);
    setError('Failed to add apartment. Please try again.');
    console.error('Error adding apartment:', error.response ? error.response.data : error);
  }
};
