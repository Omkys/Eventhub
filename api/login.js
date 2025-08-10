module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Simple test login
    if (email === 'admin@eventhub.com' && password === 'admin123') {
      return res.json({
        accessToken: 'test-token-123',
        refreshToken: 'refresh-token-123',
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@eventhub.com',
          role: 'admin',
          department: 'Computer Science',
          year: '2024'
        }
      });
    }

    if (email === 'student@eventhub.com' && password === 'student123') {
      return res.json({
        accessToken: 'test-token-456',
        refreshToken: 'refresh-token-456',
        user: {
          id: '2',
          name: 'Student User',
          email: 'student@eventhub.com',
          role: 'student',
          department: 'Computer Science',
          year: '2024'
        }
      });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};