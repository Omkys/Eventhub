import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event } from '../types';
import { eventsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Calendar, Clock, MapPin, Users, Tag, ArrowLeft, Share2, Heart, Star } from 'lucide-react';
import EventFeedback from '../components/EventFeedback';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    if (!id) return;
    try {
      const response = await eventsAPI.getById(id);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!event) return;
    try {
      const isRegistered = event.registeredStudents?.some(id => id === user?.id);
      if (isRegistered) {
        await eventsAPI.cancelRegistration(event._id);
        showToast('Registration cancelled successfully', 'success');
      } else {
        await eventsAPI.register(event._id);
        showToast('Registered successfully!', 'success');
      }
      fetchEvent();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const handleInterest = async () => {
    if (!event) return;
    try {
      await eventsAPI.showInterest(event._id);
      showToast('Interest recorded!', 'success');
      fetchEvent();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to show interest', 'error');
    }
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsAPI.delete(event._id);
      showToast('Event deleted successfully', 'success');
      navigate('/events');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to delete event', 'error');
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center py-12 text-gray-500">Event not found</div>;
  }

  const isRegistered = event.registeredStudents?.some(id => id === user?.id);
  const isInterested = event.interestedStudents?.some(id => id === user?.id);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/events')}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </button>



      <div className="card">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                event.category === 'Sports' ? 'bg-green-100 text-green-800' :
                event.category === 'Technical' ? 'bg-orange-100 text-orange-800' :
                event.category === 'Workshop' ? 'bg-yellow-100 text-yellow-800' :
                'bg-indigo-100 text-indigo-800'
              }`}>
                {event.category}
              </span>
              {event.interestedStudents && event.interestedStudents.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-1" />
                  {event.interestedStudents.length} interested
                </div>
              )}
              {event.feedback && event.feedback.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {(event.feedback.reduce((acc, f) => acc + f.rating, 0) / event.feedback.length).toFixed(1)}
                  <span className="ml-1">({event.feedback.length})</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
            title="Share event"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-700 text-lg mb-6">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-3" />
              {event.time}
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              {event.location}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-3" />
              {event.registeredStudents?.length || 0} / {event.maxParticipants} registered
            </div>
            
            <div className="flex items-center text-gray-600">
              <Tag className="h-5 w-5 mr-3" />
              {event.department} - Year {event.year}
            </div>
          </div>
        </div>

        {user?.role === 'student' && (
          <div className="flex space-x-3 mb-6">
            <button
              onClick={handleRegister}
              disabled={new Date(event.date) < new Date() || event.status === 'cancelled'}
              className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isRegistered
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'btn-primary'
              }`}
            >
              {isRegistered ? 'Cancel Registration' : 
               new Date(event.date) < new Date() ? 'Event Ended' :
               event.status === 'cancelled' ? 'Event Cancelled' :
               'Register'}
            </button>
            
            {!isInterested && new Date(event.date) >= new Date() && event.status !== 'cancelled' && (
              <button
                onClick={handleInterest}
                className="btn-secondary flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Show Interest</span>
              </button>
            )}
          </div>
        )}

        {user?.role === 'admin' && (
          <>
            <div className="flex space-x-3 mb-6">
              <button
                onClick={() => navigate(`/admin/events/${event._id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Edit Event
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Delete Event
              </button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Registered Students</h3>
              {event.registeredStudents && event.registeredStudents.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 mb-3">
                    {event.registeredStudents.length} student(s) registered
                  </p>
                  <button
                    onClick={() => navigate(`/admin/events/${event._id}/participants`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View All Participants
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No students registered yet</p>
              )}
            </div>
          </>
        )}

        <div className="border-t pt-4 mt-6 text-sm text-gray-500">
          Created by {event.createdBy?.name || 'Unknown'} on{' '}
          {new Date(event.createdAt).toLocaleDateString()}
        </div>
      </div>
      
      {/* Event Feedback Section */}
      <div className="mt-8">
        <div className="card">
          <EventFeedback 
            eventId={event._id} 
            canSubmitFeedback={Boolean(
              user?.role === 'student' && 
              isRegistered && 
              new Date(event.date) < new Date()
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;