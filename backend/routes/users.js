const express = require('express');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone, bio, department, year, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;
    if (department) updateData.department = department;
    if (year) updateData.year = year;
    if (preferences) updateData.preferences = preferences;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students (Admin only)
router.get('/students', auth, adminAuth, async (req, res) => {
  try {
    const { department, year } = req.query;
    const filter = { role: 'student' };
    
    if (department) filter.department = department;
    if (year) filter.year = parseInt(year);
    
    const students = await User.find(filter).select('-password -refreshToken');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's events (interested and registered)
router.get('/my-events', auth, async (req, res) => {
  try {
    const Event = require('../models/Event');
    
    const interestedEvents = await Event.find({ interestedStudents: req.user._id })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    const registeredEvents = await Event.find({ registeredStudents: req.user._id })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    res.json({ interestedEvents, registeredEvents });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;