const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get analytics dashboard data (Admin only)
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    // Get total counts
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Get total registrations
    const events = await Event.find();
    const totalRegistrations = events.reduce((sum, event) => 
      sum + (event.registeredStudents?.length || 0), 0
    );
    
    // Events by category
    const eventsByCategory = await Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const categoryData = {};
    eventsByCategory.forEach(item => {
      categoryData[item._id] = item.count;
    });
    
    // Events by department
    const eventsByDepartment = await Event.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);
    const departmentData = {};
    eventsByDepartment.forEach(item => {
      departmentData[item._id] = item.count;
    });
    
    // Monthly registrations (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyData = await Event.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: { $size: { $ifNull: ['$registeredStudents', []] } } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    const monthlyRegistrations = monthlyData.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      count: item.count
    }));
    
    // Popular events (top 5 by registrations)
    const popularEvents = await Event.find()
      .populate('createdBy', 'name email')
      .sort({ 'registeredStudents.length': -1 })
      .limit(5);
    
    res.json({
      totalEvents,
      totalUsers,
      totalRegistrations,
      eventsByCategory: categoryData,
      eventsByDepartment: departmentData,
      monthlyRegistrations,
      popularEvents
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;