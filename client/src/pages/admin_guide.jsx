import { useState, useEffect } from 'react';
import axios from 'axios';

// axios base URL
axios.defaults.baseURL = 'http://localhost:5000';

const AdminGuides = () => {
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    description: '',
    experience: '',
    languages: '',
    contactNumber: '',
    email: '',
    pricePerDay: '',
    rating: 1,
    specialties: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentGuideId, setCurrentGuideId] = useState(null);

  // Fetch all guides
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('/api/guides');
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image changes
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
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('languages', formData.languages);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('pricePerDay', formData.pricePerDay);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('specialties', formData.specialties);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await axios.put(`/api/guides/${currentGuideId}`, formDataToSend);
        alert('Guide updated successfully');
      } else {
        await axios.post('/api/guides', formDataToSend);
        alert('Guide added successfully');
      }

      // Refresh the guides list
      const response = await axios.get('/api/guides');
      setGuides(response.data);


      setFormData({
        name: '',
        location: '',
        image: '',
        description: '',
        experience: '',
        languages: '',
        contactNumber: '',
        email: '',
        pricePerDay: '',
        rating: 1,
        specialties: ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing guide data');
    }
  };

  // Handle delete guide
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/guides/${id}`);
      alert('Guide deleted successfully');
      setGuides(guides.filter((guide) => guide.id !== id));
    } catch (error) {
      console.error('Error deleting guide:', error);
      alert('Error deleting guide');
    }
  };

  // Set form for editing guide
  const handleEdit = (guide) => {
    if (!guide.id && !guide._id) {
      console.error('Guide ID is undefined:', guide);
      return;
    }
    setFormData({
      name: guide.name,
      location: guide.location,
      description: guide.description,
      experience: guide.experience,
      languages: guide.languages.join(', '),
      contactNumber: guide.contactNumber,
      email: guide.email,
      pricePerDay: guide.pricePerDay,
      rating: guide.rating,
      specialties: guide.specialties.join(', '),
      image: '',
    });
    setIsEditing(true);
    setCurrentGuideId(guide.id || guide._id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Guides</h1>

      {/* Guide Form */}
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
            placeholder="Guide Name"
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
            placeholder="Description and Experience Details"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            rows="4"
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages (comma-separated)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="Price Per Day"
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
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
            placeholder="Specialties (comma-separated)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition w-full mt-4"
        >
          {isEditing ? 'Update Guide' : 'Add Guide'}
        </button>
      </form>

      {/* List of Guides */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6 text-center">Existing Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(guides) &&
          guides.map((guide) => (
            <div key={guide.id || guide._id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={`http://localhost:5000/${guide.image}`}
                alt={guide.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg text-gray-800">{guide.name}</h3>
              <p className="text-gray-600">Location: {guide.location}</p>
              <p className="text-gray-600">{guide.description}</p>
              <p className="text-gray-600">Experience: {guide.experience} years</p>
              <p className="text-gray-600">Languages: {guide.languages.join(', ')}</p>
              <p className="text-gray-600">Contact: {guide.contactNumber}</p>
              <p className="text-gray-600">Email: {guide.email}</p>
              <p className="text-gray-600">Price per day: ${guide.pricePerDay}</p>
              <p className="text-gray-600">Rating: {guide.rating} ⭐</p>
              <p className="text-gray-600">Specialties: {guide.specialties.join(', ')}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(guide)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guide.id || guide._id)}
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

export default AdminGuides;
