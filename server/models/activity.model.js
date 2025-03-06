const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, 
  difficultyLevel: { type: String, required: true, enum: ['Easy', 'Moderate', 'Difficult'] },
  price: { type: Number, required: true },
  included: [{ type: String }], 
  requirements: [{ type: String }], 
  maxGroupSize: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Activity', activitySchema);