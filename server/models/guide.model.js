const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: Number, required: true },
  languages: [{ type: String, required: true }],
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  specialties: [{ type: String }]
});

module.exports = mongoose.model('Guide', guideSchema);