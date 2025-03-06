// admin_activities.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: null,
    description: '',
    duration: '',
    difficultyLevel: 'Easy',
    price: '',
    included: '',
    requirements: '',
    maxGroupSize: '',
    rating: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities');
      setActivities(response.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch activities');
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/activities/${editingId}`, formDataToSend);
      } else {
        await axios.post('http://localhost:5000/api/activities', formDataToSend);
      }
      fetchActivities();
      setFormData({
        name: '',
        location: '',
        image: null,
        description: '',
        duration: '',
        difficultyLevel: 'Easy',
        price: '',
        included: '',
        requirements: '',
        maxGroupSize: '',
        rating: '',
        category: ''
      });
      setEditingId(null);
    } catch {
      setError('Error saving activity');
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      name: activity.name,
      location: activity.location,
      image: activity.image,
      description: activity.description,
      duration: activity.duration,
      difficultyLevel: activity.difficultyLevel,
      price: activity.price,
      included: activity.included.join(', '),
      requirements: activity.requirements.join(', '),
      maxGroupSize: activity.maxGroupSize,
      rating: activity.rating,
      category: activity.category
    });
    setEditingId(activity._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await axios.delete(`http://localhost:5000/api/activities/${id}`);
        fetchActivities();
      } catch {
        setError('Error deleting activity');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Activities</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Activity Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select Location</option>
            <option value="Nuwaraeliya">Nuwaraeliya</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Colombo">Colombo</option>
            <option value="Ella">Ella</option>
            <option value="Galle">Galle</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Yala">Yala</option>
          </select>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (hours)"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="maxGroupSize"
            placeholder="Max Group Size"
            value={formData.maxGroupSize}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            max="5"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            rows="4"
          />
          <textarea
            name="included"
            placeholder="Included Items (comma-separated)"
            value={formData.included}
            onChange={handleInputChange}
            className="w-full col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            rows="2"
          />
          <textarea
            name="requirements"
            placeholder="Requirements (comma-separated)"
            value={formData.requirements}
            onChange={handleInputChange}
            className="w-full col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            rows="2"
          />
          <button
            type="submit"
            className="col-span-2 bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition w-full mt-4"
          >
            {editingId ? "Update Activity" : "Add Activity"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-8">Existing Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {activities.map((activity) => (
          <div key={activity._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={`http://localhost:5000/${activity.image}`}
              alt={activity.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800">{activity.name}</h3>
            <p className="text-gray-600">{activity.location}</p>
            <p className="text-gray-600">Duration: {activity.duration} hours</p>
            <p className="text-gray-600">Price: LKR {activity.price}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(activity)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default AdminActivities;