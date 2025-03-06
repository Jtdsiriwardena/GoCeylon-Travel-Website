const Guide = require('../models/guide.model');

exports.createGuide = async (req, res) => {
  try {
    const newGuideData = {
      ...req.body,
      image: req.file ? req.file.path : null,
      languages: req.body.languages.split(',').map(lang => lang.trim()),
      specialties: req.body.specialties.split(',').map(spec => spec.trim())
    };
    const newGuide = new Guide(newGuideData);
    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(500).json({ message: 'Error creating guide', error });
  }
};

exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().lean(); 
   
    const transformedGuides = guides.map((guide) => ({
      ...guide,
      id: guide._id,
    }));
    res.status(200).json(transformedGuides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guides', error });
  }
};


exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guide', error });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
      languages: req.body.languages.split(',').map(lang => lang.trim()),
      specialties: req.body.specialties.split(',').map(spec => spec.trim())
    };
    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedGuide) return res.status(404).json({ message: 'Guide not found' });
    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: 'Error updating guide', error });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
    if (!deletedGuide) return res.status(404).json({ message: 'Guide not found' });
    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting guide', error });
  }
};
