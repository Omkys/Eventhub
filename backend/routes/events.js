const express = require('express');
const { z } = require('zod');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().refine(date => !isNaN(Date.parse(date))),
  time: z.string().min(1),
  department: z.string().min(1),
  year: z.number().min(1).max(4),
  location: z.string().min(1),
  category: z.enum(['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Seminar']).optional(),
  maxParticipants: z.number().min(1).optional(),
  image: z.string().optional()
});

// Create event (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const validatedData = eventSchema.parse(req.body);
    
    const event = new Event({
      ...validatedData,
      date: new Date(validatedData.date),
      createdBy: req.user._id
    });
    
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const { department, year } = req.query;
    const filter = {};
    
    if (department) filter.department = department;
    if (year) filter.year = parseInt(year);
    
    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('interestedStudents', 'name email department year')
      .populate('registeredStudents', 'name email department year');
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const validatedData = eventSchema.parse(req.body);
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, date: new Date(validatedData.date) },
      { new: true }
    );
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Show interest in event (Student only)
router.post('/:id/interest', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can show interest' });
    }
    
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.interestedStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already showed interest' });
    }
    
    event.interestedStudents.push(req.user._id);
    await event.save();
    
    res.json({ message: 'Interest recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for event (Student only)
router.post('/:id/register', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can register' });
    }
    
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.registeredStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already registered' });
    }
    
    event.registeredStudents.push(req.user._id);
    await event.save();
    
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel registration (Student only)
router.delete('/:id/register', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can cancel registration' });
    }
    
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    event.registeredStudents = event.registeredStudents.filter(
      id => !id.equals(req.user._id)
    );
    await event.save();
    
    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get registered events for student
router.get('/my/registered', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view registered events' });
    }
    
    const events = await Event.find({ registeredStudents: req.user._id })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event participants (Admin only)
router.get('/:id/participants', auth, adminAuth, async (req, res) => {
  try {
    const { department, year } = req.query;
    
    const event = await Event.findById(req.params.id)
      .populate('registeredStudents', 'name email department year');
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    let participants = event.registeredStudents;
    
    if (department) {
      participants = participants.filter(student => student.department === department);
    }
    
    if (year) {
      participants = participants.filter(student => student.year === parseInt(year));
    }
    
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;