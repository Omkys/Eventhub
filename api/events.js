// Mock events storage
let mockEvents = [
  {
    _id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring latest innovations',
    date: '2024-03-15T10:00:00Z',
    location: 'Main Auditorium',
    category: 'Technology',
    department: 'Computer Science',
    year: '2024',
    maxParticipants: 100,
    registeredCount: 45,
    createdBy: 'Admin User',
    status: 'upcoming'
  },
  {
    _id: '2',
    title: 'Cultural Fest',
    description: 'Celebrate diversity with music, dance, and food',
    date: '2024-03-20T18:00:00Z',
    location: 'Campus Ground',
    category: 'Cultural',
    department: 'All',
    year: '2024',
    maxParticipants: 500,
    registeredCount: 234,
    createdBy: 'Admin User',
    status: 'upcoming'
  },
  {
    _id: '3',
    title: 'Career Fair',
    description: 'Meet top employers and explore career opportunities',
    date: '2024-03-25T09:00:00Z',
    location: 'Exhibition Hall',
    category: 'Career',
    department: 'All',
    year: '2024',
    maxParticipants: 300,
    registeredCount: 156,
    createdBy: 'Admin User',
    status: 'upcoming'
  }
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.json(mockEvents);
  } else if (req.method === 'POST') {
    try {
      const { title, description, date, location, category, department, year, maxParticipants } = req.body;
      
      if (!title || !description || !date || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const newEvent = {
        _id: Date.now().toString(),
        title,
        description,
        date,
        location,
        category: category || 'General',
        department: department || 'All',
        year: year || '2024',
        maxParticipants: maxParticipants || 100,
        registeredCount: 0,
        createdBy: 'Admin User',
        status: 'upcoming'
      };
      
      mockEvents.push(newEvent);
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};