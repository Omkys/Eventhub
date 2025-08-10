import axios from 'axios';
import { AuthResponse, Event, User, Analytics, EventFeedback, AppNotification } from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-railway-backend-url.railway.app/api' 
  : 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshUrl = process.env.NODE_ENV === 'production' 
            ? 'https://your-railway-backend-url.railway.app/api/auth/refresh' 
            : 'http://localhost:5001/api/auth/refresh';
          const response = await axios.post(refreshUrl, {
            refreshToken,
          });
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          return api.request(error.config);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: any) => api.post<AuthResponse>('/auth/register', data),
  login: (data: any) => api.post<AuthResponse>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get<{ user: User }>('/auth/me'),
};

export const eventsAPI = {
  getAll: (params?: any) => api.get<Event[]>('/events', { params }),
  getById: (id: string) => api.get<Event>(`/events/${id}`),
  create: (data: any) => api.post<{ event: Event }>('/events', data),
  update: (id: string, data: any) => api.put<{ event: Event }>(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  showInterest: (id: string) => api.post(`/events/${id}/interest`),
  register: (id: string) => api.post(`/events/${id}/register`),
  cancelRegistration: (id: string) => api.delete(`/events/${id}/register`),
  getMyRegistered: () => api.get<Event[]>('/events/my/registered'),
  getParticipants: (id: string) => api.get<User[]>(`/events/${id}/participants`),
};

export const usersAPI = {
  getProfile: () => api.get<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => api.put<User>('/users/profile', data),
  getMyEvents: () => api.get<{ interestedEvents: Event[]; registeredEvents: Event[] }>('/users/my-events'),
  getStudents: (params?: any) => api.get<User[]>('/users/students', { params }),
  uploadAvatar: (formData: FormData) => api.post<{ avatarUrl: string }>('/users/avatar', formData),
};

export const notificationsAPI = {
  getAll: () => api.get<AppNotification[]>('/notifications'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getUnreadCount: () => api.get<{ count: number }>('/notifications/unread-count'),
};

export const analyticsAPI = {
  getDashboard: () => api.get<Analytics>('/analytics/dashboard'),
  getEventStats: (id: string) => api.get(`/analytics/events/${id}`),
};

export const feedbackAPI = {
  submitFeedback: (eventId: string, data: { rating: number; comment: string }) => 
    api.post(`/events/${eventId}/feedback`, data),
  getEventFeedback: (eventId: string) => api.get<EventFeedback[]>(`/events/${eventId}/feedback`),
};

export default api;