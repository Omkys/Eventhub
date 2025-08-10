const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

async function testAPI() {
  try {
    console.log('🧪 Testing EventHub API...\n');

    // Test 1: Register Admin
    console.log('1. Registering Admin...');
    const adminData = {
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin'
    };
    
    const adminRes = await axios.post(`${BASE_URL}/auth/register`, adminData);
    console.log('✅ Admin registered:', adminRes.data.user);
    const adminToken = adminRes.data.accessToken;

    // Test 2: Register Student
    console.log('\n2. Registering Student...');
    const studentData = {
      name: 'Test Student',
      email: 'student@test.com',
      password: 'student123',
      role: 'student',
      department: 'Computer Science',
      year: 3
    };
    
    const studentRes = await axios.post(`${BASE_URL}/auth/register`, studentData);
    console.log('✅ Student registered:', studentRes.data.user);
    const studentToken = studentRes.data.accessToken;

    // Test 3: Create Event (Admin)
    console.log('\n3. Creating Event...');
    const eventData = {
      title: 'Tech Workshop',
      description: 'Learn latest technologies',
      date: '2024-12-25',
      time: '10:00 AM',
      department: 'Computer Science',
      year: 3
    };
    
    const eventRes = await axios.post(`${BASE_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Event created:', eventRes.data.event.title);
    const eventId = eventRes.data.event._id;

    // Test 4: Get All Events
    console.log('\n4. Getting All Events...');
    const eventsRes = await axios.get(`${BASE_URL}/events`);
    console.log('✅ Events fetched:', eventsRes.data.length, 'events');

    // Test 5: Student Register for Event
    console.log('\n5. Student Registering for Event...');
    await axios.post(`${BASE_URL}/events/${eventId}/register`, {}, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Student registered for event');

    // Test 6: Get Student's Registered Events
    console.log('\n6. Getting Student\'s Registered Events...');
    const myEventsRes = await axios.get(`${BASE_URL}/events/my/registered`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ Student registered events:', myEventsRes.data.length);

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();