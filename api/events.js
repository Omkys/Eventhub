module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Mock events data
  const mockEvents = [
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

  if (req.method === 'GET') {
    res.json(mockEvents);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};