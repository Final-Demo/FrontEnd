// Child Component: Property Card
const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  // Use the backend's shareable image URL if it exists; otherwise, fallback to a default image
  const imageUrl = property.imageUrl || 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; 

  return (
    <Link
      to={`/apartmentdetail/${property.id}`} // Link to the ApartmentDetail page with the apartment id
      className="bg-white rounded-lg shadow-lg"
    >
      <img
        src={imageUrl}
        alt={property.title}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl">{property.title}</h3>
        <p className="text-gray-500">{property.location}</p>
        <p className="text-green-600 font-semibold">${property.price.toLocaleString()}</p>
        <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>

        {/* Add to Favourite Button (Heart Icon) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(property.id, isFavourite);
          }}
          className={`text-xl ${isFavourite ? 'text-red-500' : 'text-gray-500'}`}
        >
          <FaHeart />
        </button>
      </div>
    </Link>
  );
};
