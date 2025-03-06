const Hotel = require('../models/hotel.model');

// Create hotel
exports.createHotel = async (req, res) => {
    try {
      const newHotelData = {
        ...req.body,
        image: req.file ? req.file.path : null, 
      };
      const newHotel = new Hotel(newHotelData);
      await newHotel.save();
      res.status(201).json(newHotel);
    } catch (error) {
      res.status(500).json({ message: 'Error creating hotel', error });
    }
  };
  

// Get all hotels

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().lean();
    
    const transformedHotels = hotels.map((hotel) => ({
      ...hotel,
      id: hotel._id,
    }));
    res.status(200).json(transformedHotels); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
};


// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error });
  }
};

// Update hotel
exports.updateHotel = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error });
  }
};


// Delete hotel
exports.deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
};
