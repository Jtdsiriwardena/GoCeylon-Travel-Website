import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const AdminRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    description: '',
    cuisine: '',
    priceRange: '',
    rating: 1,
    openingHours: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(`/api/restaurants/${currentRestaurantId}`, formDataToSend);
        alert('Restaurant updated successfully');
      } else {
        await axios.post('/api/restaurants', formDataToSend);
        alert('Restaurant added successfully');
      }

      const response = await axios.get('/api/restaurants');
      setRestaurants(response.data);

      setFormData({
        name: '',
        location: '',
        image: '',
        description: '',
        cuisine: '',
        priceRange: '',
        rating: 1,
        openingHours: ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing restaurant data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/restaurants/${id}`);
      alert('Restaurant deleted successfully');
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Error deleting restaurant');
    }
  };

  const handleEdit = (restaurant) => {
    if (!restaurant.id && !restaurant._id) {
      console.error('Restaurant ID is undefined:', restaurant);
      return;
    }
    setFormData({
      name: restaurant.name,
      location: restaurant.location,
      description: restaurant.description,
      cuisine: restaurant.cuisine,
      priceRange: restaurant.priceRange,
      rating: restaurant.rating,
      openingHours: restaurant.openingHours,
      image: '',
    });
    setIsEditing(true);
    setCurrentRestaurantId(restaurant.id || restaurant._id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Restaurants</h1>

      {/* Restaurant Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
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
            onChange={handleImageChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={!isEditing}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            rows="4"
          />
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="Cuisine Type"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            placeholder="Price Range"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            placeholder="Opening Hours (e.g., 9:00 AM - 10:00 PM)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition w-full mt-4"
        >
          {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
        </button>
      </form>

      {/* List of Restaurants */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-8">Existing Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(restaurants) &&
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={`http://localhost:5000/${restaurant.image}`}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
              <p className="text-gray-600">Location: {restaurant.location}</p>
              <p className="text-gray-600">{restaurant.description}</p>
              <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
              <p className="text-gray-600">Price Range: {restaurant.priceRange}</p>
              <p className="text-gray-600">Rating: {restaurant.rating} ⭐</p>
              <p className="text-gray-600">Opening Hours: {restaurant.openingHours}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(restaurant)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(restaurant.id)}
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

export default AdminRestaurant;
