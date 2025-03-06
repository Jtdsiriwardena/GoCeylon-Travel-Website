const express = require('express');
const multer = require('multer');
const router = express.Router();
const guideController = require('../controllers/guide.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/guides', upload.single('image'), guideController.createGuide);
router.get('/guides', guideController.getGuides);
router.get('/guides/:id', guideController.getGuideById);
router.put('/guides/:id', upload.single('image'), guideController.updateGuide);
router.delete('/guides/:id', guideController.deleteGuide);

module.exports = router;