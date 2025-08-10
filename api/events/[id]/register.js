module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'POST') {
    // Register for event
    res.json({ message: 'Registered successfully' });
  } else if (req.method === 'DELETE') {
    // Cancel registration
    res.json({ message: 'Registration cancelled successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};