import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ActivitiesByLocation = ({ location }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/activities');
        const filteredActivities = response.data.filter(
          activity => activity.location.toLowerCase() === location.toLowerCase()
        );
        setActivities(filteredActivities);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch activities');
        setLoading(false);
        console.error('Error fetching activities:', err);
      }
    };

    fetchActivities();
  }, [location]);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>{error}</div>;
  if (activities.length === 0) return <div>No activities found in {location}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {activities.map((activity) => (
        <div key={activity._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
          <img
            src={`http://localhost:5000/${activity.image}`}
            alt={activity.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{activity.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{activity.category}</p>
            <div className="flex space-x-2 mb-2">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{activity.difficultyLevel}</span>
              <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">{activity.duration} hours</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">{activity.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-blue-600">LKR {activity.price}</span>
              <span className="text-yellow-500">{activity.rating} ⭐</span>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Whats Included:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {activity.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {activity.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Max Group Size: {activity.maxGroupSize} people</span>
            </div>
            <button className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border-2 border-black hover:border-black transition duration-300 ease-in-out">
              Book Activity
            </button>
          </div>
        </div>
      ))}
    </div>

  );
};

ActivitiesByLocation.propTypes = {
  location: PropTypes.string.isRequired,
};

export default ActivitiesByLocation;