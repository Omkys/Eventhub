module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Mock current user data
    const mockUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@eventhub.com',
      role: 'admin',
      department: 'Computer Science',
      year: '2024'
    };
    
    res.json(mockUser);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};