const express = require('express');
const multer = require('multer');
const router = express.Router();
const activityController = require('../controllers/activity.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/activities', upload.single('image'), activityController.createActivity);
router.get('/activities', activityController.getActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', upload.single('image'), activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;