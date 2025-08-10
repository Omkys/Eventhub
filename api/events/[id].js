// Mock events storage (shared with events.js)
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    // Get single event
    const event = mockEvents.find(e => e._id === id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } else if (req.method === 'PUT') {
    // Update event
    try {
      const { title, description, date, location, category, department, year, maxParticipants } = req.body;
      
      const eventIndex = mockEvents.findIndex(e => e._id === id);
      if (eventIndex === -1) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      mockEvents[eventIndex] = {
        ...mockEvents[eventIndex],
        title: title || mockEvents[eventIndex].title,
        description: description || mockEvents[eventIndex].description,
        date: date || mockEvents[eventIndex].date,
        location: location || mockEvents[eventIndex].location,
        category: category || mockEvents[eventIndex].category,
        department: department || mockEvents[eventIndex].department,
        year: year || mockEvents[eventIndex].year,
        maxParticipants: maxParticipants || mockEvents[eventIndex].maxParticipants
      };
      
      res.json({ message: 'Event updated successfully', event: mockEvents[eventIndex] });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    // Delete event
    const eventIndex = mockEvents.findIndex(e => e._id === id);
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    mockEvents.splice(eventIndex, 1);
    res.json({ message: 'Event deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};