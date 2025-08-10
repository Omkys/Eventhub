import React, { useState, useEffect } from 'react';
import { feedbackAPI } from '../services/api';
import { EventFeedback as FeedbackType } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { Star, MessageCircle, Send } from 'lucide-react';

interface EventFeedbackProps {
  eventId: string;
  canSubmitFeedback: boolean;
}

const EventFeedback: React.FC<EventFeedbackProps> = ({ eventId, canSubmitFeedback }) => {
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { showToast } = useNotifications();

  useEffect(() => {
    fetchFeedback();
  }, [eventId]);

  const fetchFeedback = async () => {
    try {
      const response = await feedbackAPI.getEventFeedback(eventId);
      setFeedback(response.data);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      showToast('Please select a rating', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await feedbackAPI.submitFeedback(eventId, { rating, comment });
      showToast('Feedback submitted successfully!', 'success');
      setShowForm(false);
      setRating(0);
      setComment('');
      fetchFeedback();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to submit feedback', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = feedback.length > 0 
    ? feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length 
    : 0;

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Event Feedback</h3>
          {feedback.length > 0 && (
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({feedback.length} review{feedback.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}
        </div>
        
        {canSubmitFeedback && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Leave Feedback</span>
          </button>
        )}
      </div>

      {/* Feedback Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Share Your Experience</h4>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              {renderStars(rating, true, setRating)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="input-field"
                placeholder="Share your thoughts about this event..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setRating(0);
                  setComment('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || rating === 0}
                className="btn-primary flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Feedback'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No feedback yet. Be the first to share your experience!</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div key={item._id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {item.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.userName}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(item.rating)}
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {item.comment && (
                <p className="text-sm text-gray-700 mt-2 pl-11">{item.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventFeedback;