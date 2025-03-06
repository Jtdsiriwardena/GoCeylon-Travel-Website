import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const GuidesByLocation = ({ location }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/guides');
        const filteredGuides = response.data.filter(
          guide => guide.location.toLowerCase() === location.toLowerCase()
        );
        setGuides(filteredGuides);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch guides');
        setLoading(false);
        console.error('Error fetching guides:', err);
      }
    };

    fetchGuides();
  }, [location]);

  if (loading) return <div>Loading guides...</div>;
  if (error) return <div>{error}</div>;
  if (guides.length === 0) return <div>No guides found in {location}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {guides.map((guide) => (
        <div key={guide._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
          <img
            src={`http://localhost:5000/${guide.image}`}
            alt={guide.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{guide.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{guide.experience} years of experience</p>
            <p className="text-gray-600 text-sm mb-2">Languages: {guide.languages.join(', ')}</p>
            <p className="text-gray-700 text-sm mb-4">{guide.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-blue-600">LKR {guide.pricePerDay}/day</span>
              <span className="text-yellow-500">{guide.rating} ⭐</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">Specialties: {guide.specialties.join(', ')}</p>
            <div className="mb-4">
              <p className="text-gray-700">Contact: {guide.contactNumber}</p>
              <p className="text-gray-700">Email: {guide.email}</p>
            </div>
            <button className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black hover:border-black transition duration-300 ease-in-out">
              Book Guide
            </button>
          </div>
        </div>
      ))}
    </div>

  );
};


GuidesByLocation.propTypes = {
  location: PropTypes.string.isRequired,
};


export default GuidesByLocation;
