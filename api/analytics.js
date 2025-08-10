module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Mock analytics data
    const mockAnalytics = {
      totalEvents: 3,
      totalRegistrations: 435,
      totalStudents: 1250,
      upcomingEvents: 3,
      popularEvents: [
        { name: 'Cultural Fest', registrations: 234 },
        { name: 'Career Fair', registrations: 156 },
        { name: 'Tech Conference 2024', registrations: 45 }
      ],
      departmentStats: [
        { department: 'Computer Science', events: 1, registrations: 45 },
        { department: 'All Departments', events: 2, registrations: 390 }
      ],
      monthlyRegistrations: [
        { month: 'Jan', registrations: 120 },
        { month: 'Feb', registrations: 150 },
        { month: 'Mar', registrations: 165 }
      ]
    };
    
    res.json(mockAnalytics);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};