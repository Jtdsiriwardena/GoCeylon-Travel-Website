const express = require('express');
const multer = require('multer');
const router = express.Router();
const restaurantController = require('../controllers/restaurent.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/restaurants', upload.single('image'), restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', upload.single('image'), restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

module.exports = router;