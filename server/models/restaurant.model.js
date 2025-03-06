const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: true },
  priceRange: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  openingHours: { type: String, required: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);