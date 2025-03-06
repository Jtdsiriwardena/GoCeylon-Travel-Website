import { useState, useEffect } from 'react';
import axios from 'axios';

// axios base URL
axios.defaults.baseURL = 'http://localhost:5000';

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    description: '',
    priceRange: '',
    rating: 1,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState(null);

  // Fetch all hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
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
    formDataToSend.append('name', formData.name);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('priceRange', formData.priceRange);
    formDataToSend.append('rating', formData.rating);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await axios.put(`/api/hotels/${currentHotelId}`, formDataToSend);
        alert('Hotel updated successfully');
      } else {
        await axios.post('/api/hotels', formDataToSend);
        alert('Hotel added successfully');
      }


      const response = await axios.get('/api/hotels');
      setHotels(response.data);


      setFormData({
        name: '',
        location: '',
        image: '',
        description: '',
        priceRange: '',
        rating: 1,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing hotel data');
    }
  };

  // Handle delete hotel
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/hotels/${id}`);
      alert('Hotel deleted successfully');
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('Error deleting hotel');
    }
  };

  // Set form for editing hotel
  const handleEdit = (hotel) => {
    if (!hotel.id && !hotel._id) {
      console.error('Hotel ID is undefined:', hotel);
      return;
    }
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      priceRange: hotel.priceRange,
      rating: hotel.rating,
      image: '',
    });
    setIsEditing(true);
    setCurrentHotelId(hotel.id || hotel._id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Hotels</h1>

      {/* Hotel Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-4xl mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Hotel Name"
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
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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
        <button
          type="submit"
          className="col-span-2 bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition w-full mt-4"
        >
          {isEditing ? 'Update Hotel' : 'Add Hotel'}
        </button>
      </form>

      {/* List of Hotels */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mt-8 mb-4">Existing Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(hotels) && hotels.map((hotel) => (
          <div key={hotel.id || hotel._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={`http://localhost:5000/${hotel.image}`}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg text-gray-800">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-gray-600">{hotel.description}</p>
            <p className="text-gray-600">{hotel.priceRange}</p>
            <p className="text-gray-600">{hotel.rating} ⭐</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(hotel)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hotel.id || hotel._id)}
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

export default AdminHotel;
