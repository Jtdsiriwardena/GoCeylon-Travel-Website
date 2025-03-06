const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });


router.post('/hotels', upload.single('image'), hotelController.createHotel);


// Get all hotels
router.get('/hotels', hotelController.getHotels);

// Get hotel by ID
router.get('/hotels/:id', hotelController.getHotelById);

// Update hotel
router.put('/hotels/:id', upload.single('image'), hotelController.updateHotel);


// Delete hotel
router.delete('/hotels/:id', hotelController.deleteHotel);

module.exports = router;
