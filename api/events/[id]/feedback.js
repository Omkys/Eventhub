module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Mock feedback data - return empty array to prevent reduce error
    res.json([]);
  } else if (req.method === 'POST') {
    res.json({ message: 'Feedback submitted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};