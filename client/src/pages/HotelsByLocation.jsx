import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HotelsByLocation = ({ location }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/hotels`);

        const filteredHotels = response.data.filter(
          hotel => hotel.location.toLowerCase() === location.toLowerCase()
        );
        setHotels(filteredHotels);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hotels');
        setLoading(false);
        console.error('Error fetching hotels:', err);
      }
    };

    fetchHotels();
  }, [location]);

  if (loading) return <div>Loading hotels...</div>;
  if (error) return <div>{error}</div>;
  if (hotels.length === 0) return <div>No hotels found in {location}</div>;


  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {hotels.map((hotel) => (
        <div key={hotel._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
          <img
            src={`http://localhost:5000/${hotel.image}`}
            alt={hotel.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{hotel.name}</h3>
            <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-blue-600">{hotel.priceRange}</span>
              <span className="text-yellow-500">{hotel.rating} ⭐</span>
            </div>
            <button className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black hover:border-black transition duration-300 ease-in-out">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>


  );
};

HotelsByLocation.propTypes = {
  location: PropTypes.string.isRequired,
};

export default HotelsByLocation;
