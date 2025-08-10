export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  department?: string;
  year?: number;
  avatar?: string;
  bio?: string;
  phone?: string;
  preferences?: {
    categories: string[];
    departments: string[];
    emailNotifications: boolean;
  };
  joinedAt?: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  department: string;
  year: number;
  location: string;
  category: 'Academic' | 'Cultural' | 'Sports' | 'Technical' | 'Workshop' | 'Seminar';
  maxParticipants: number;
  image?: string;
  tags?: string[];
  prerequisites?: string;
  benefits?: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  interestedStudents?: string[];
  registeredStudents?: string[];
  feedback?: EventFeedback[];
  createdAt: string;
  updatedAt: string;
}

export interface EventFeedback {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AppNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event_reminder' | 'event_update' | 'registration_success' | 'event_cancelled' | 'general';
  read: boolean;
  eventId?: string;
  createdAt: string;
}

export interface Analytics {
  totalEvents: number;
  totalUsers: number;
  totalRegistrations: number;
  eventsByCategory: { [key: string]: number };
  eventsByDepartment: { [key: string]: number };
  monthlyRegistrations: { month: string; count: number }[];
  popularEvents: Event[];
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  refreshToken: string;
}