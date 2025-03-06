import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantsByLocation = ({ location }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/restaurants');

        const filteredRestaurants = response.data.filter(
          restaurant => restaurant.location.toLowerCase() === location.toLowerCase()
        );
        setRestaurants(filteredRestaurants);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurants');
        setLoading(false);
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, [location]);

  if (loading) return <div>Loading restaurants...</div>;
  if (error) return <div>{error}</div>;
  if (restaurants.length === 0) return <div>No restaurants found in {location}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
          <img
            src={`http://localhost:5000/${restaurant.image}`}
            alt={restaurant.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm mb-2">Cuisine: {restaurant.cuisine}</p>
            <p className="text-gray-700 text-sm mb-4">{restaurant.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-blue-600">{restaurant.priceRange}</span>
              <span className="text-yellow-500">{restaurant.rating} ⭐</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">Hours: {restaurant.openingHours}</p>
            <button className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black hover:border-black transition duration-300 ease-in-out">
              Reserve Table
            </button>
          </div>
        </div>
      ))}
    </div>

  );
};


RestaurantsByLocation.propTypes = {
  location: PropTypes.string.isRequired,
};

export default RestaurantsByLocation;
