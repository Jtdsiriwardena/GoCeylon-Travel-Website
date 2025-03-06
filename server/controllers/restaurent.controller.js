const Restaurant = require('../models/restaurant.model');

exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurantData = {
      ...req.body,
      image: req.file ? req.file.path : null,
    };
    const newRestaurant = new Restaurant(newRestaurantData);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant', error });
  }
};


exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean(); 
    const transformedRestaurants = restaurants.map((restaurant) => ({
      ...restaurant,
      id: restaurant._id,
    }));
    res.status(200).json(transformedRestaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error });
  }
};