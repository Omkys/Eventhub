module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Mock user profile
  const mockProfile = {
    id: '1',
    name: 'Admin User',
    email: 'admin@eventhub.com',
    role: 'admin',
    department: 'Computer Science',
    year: '2024',
    avatar: null,
    preferences: {
      notifications: true,
      emailUpdates: true
    }
  };

  if (req.method === 'GET') {
    res.json(mockProfile);
  } else if (req.method === 'PUT') {
    res.json({ message: 'Profile updated successfully', user: mockProfile });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};