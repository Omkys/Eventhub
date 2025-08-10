import React from 'react';
import { Event } from '../types';
import { Calendar, Clock, MapPin, Users, Tag, Star, Heart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { eventsAPI } from '../services/api';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
  onUpdate?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onUpdate }) => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const isRegistered = event.registeredStudents?.some(id => id === user?.id) || false;
  const isInterested = event.interestedStudents?.some(id => id === user?.id) || false;
  
  const isEventPast = new Date(event.date) < new Date();
  const isEventFull = (event.registeredStudents?.length || 0) >= event.maxParticipants;

  const handleRegister = async () => {
    try {
      if (isRegistered) {
        await eventsAPI.cancelRegistration(event._id);
        showToast('Registration cancelled successfully', 'success');
      } else {
        await eventsAPI.register(event._id);
        showToast('Registered successfully!', 'success');
      }
      onUpdate?.();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const handleInterest = async () => {
    try {
      await eventsAPI.showInterest(event._id);
      showToast('Interest recorded!', 'success');
      onUpdate?.();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to record interest', 'error');
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsAPI.delete(event._id);
        showToast('Event deleted successfully', 'success');
        onUpdate?.();
      } catch (error: any) {
        showToast(error.response?.data?.message || 'Failed to delete event', 'error');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Academic: 'bg-blue-100 text-blue-800',
      Cultural: 'bg-purple-100 text-purple-800',
      Sports: 'bg-green-100 text-green-800',
      Technical: 'bg-orange-100 text-orange-800',
      Workshop: 'bg-yellow-100 text-yellow-800',
      Seminar: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = () => {
    if (event.status === 'cancelled') {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Cancelled</span>;
    }
    if (isEventPast) {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Completed</span>;
    }
    if (isEventFull) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Full</span>;
    }
    return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Open</span>;
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative group">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      )}
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link to={`/events/${event._id}`} className="hover:text-blue-600">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">{event.title}</h3>
          </Link>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge()}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>
        
        {user?.role === 'admin' && event.createdBy?._id === user.id && (
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/admin/events/${event._id}/edit`}
              className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(event.date)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          {event.time}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {event.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span className={isEventFull ? 'text-red-600 font-medium' : ''}>
            {event.registeredStudents?.length || 0} / {event.maxParticipants} registered
          </span>
        </div>
        
        {event.interestedStudents && event.interestedStudents.length > 0 && (
          <div className="flex items-center text-sm text-gray-600">
            <Heart className="h-4 w-4 mr-2" />
            {event.interestedStudents.length} interested
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-600">
          <Tag className="h-4 w-4 mr-2" />
          {event.department} - Year {event.year}
        </div>
      </div>

      {user?.role === 'student' && (
        <div className="flex space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleRegister(); }}
            disabled={isEventPast || event.status === 'cancelled' || (!isRegistered && isEventFull)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isRegistered
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'btn-primary'
            }`}
          >
            {isRegistered ? 'Cancel Registration' : 
             isEventFull ? 'Event Full' : 
             isEventPast ? 'Event Ended' : 
             'Register'}
          </button>
          
          {!isInterested && !isEventPast && event.status !== 'cancelled' && (
            <button
              onClick={(e) => { e.stopPropagation(); handleInterest(); }}
              className="btn-secondary flex items-center space-x-1"
            >
              <Heart className="w-4 h-4" />
              <span>Interest</span>
            </button>
          )}
        </div>
      )}
      
      {event.feedback && event.feedback.length > 0 && (
        <div className="mt-3 flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {(event.feedback.reduce((acc, f) => acc + f.rating, 0) / event.feedback.length).toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500">({event.feedback.length} reviews)</span>
        </div>
      )}

      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
        <span>Created by {event.createdBy?.name || 'Unknown'}</span>
        <span>{new Date(event.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default EventCard;