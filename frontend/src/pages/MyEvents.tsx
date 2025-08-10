import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { usersAPI } from '../services/api';
import EventCard from '../components/EventCard';
import { Heart, Calendar } from 'lucide-react';

const MyEvents: React.FC = () => {
  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'registered' | 'interested'>('registered');

  const fetchMyEvents = async () => {
    try {
      const response = await usersAPI.getMyEvents();
      setInterestedEvents(response.data.interestedEvents);
      setRegisteredEvents(response.data.registeredEvents);
    } catch (error) {
      console.error('Error fetching my events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentEvents = activeTab === 'registered' ? registeredEvents : interestedEvents;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <p className="text-gray-600 mt-2">Manage your event registrations and interests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('registered')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'registered'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Registered Events ({registeredEvents.length})</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('interested')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'interested'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Interested Events ({interestedEvents.length})</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Events Grid */}
      {currentEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {activeTab === 'registered' 
              ? 'No registered events yet' 
              : 'No events marked as interested yet'
            }
          </div>
          <p className="text-gray-400 mt-2">
            {activeTab === 'registered'
              ? 'Register for events to see them here'
              : 'Show interest in events to see them here'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onUpdate={fetchMyEvents}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;