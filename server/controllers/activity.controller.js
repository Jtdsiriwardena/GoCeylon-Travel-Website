const Activity = require('../models/activity.model');

exports.createActivity = async (req, res) => {
  try {
    const newActivityData = {
      ...req.body,
      image: req.file ? req.file.path : null,
      included: req.body.included.split(',').map(item => item.trim()),
      requirements: req.body.requirements.split(',').map(req => req.trim())
    };
    const newActivity = new Activity(newActivityData);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating activity', error });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      image: req.file ? req.file.path : req.body.image,
      included: req.body.included.split(',').map(item => item.trim()),
      requirements: req.body.requirements.split(',').map(req => req.trim())
    };
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error updating activity', error });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error });
  }
};