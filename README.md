# EventHub - College Event Management System

A modern, full-stack web application for managing college events with role-based access control, real-time notifications, and comprehensive analytics.

## ✨ Features

### For Students
- 🎓 Browse college events by department, year, and category
- 📝 Register for events and show interest with one click
- 👤 Comprehensive user profiles with preferences and avatar upload
- 🔍 Advanced search and filter functionality
- 🔔 Real-time notifications for event updates
- ⭐ Rate and review events after attendance
- 📱 Responsive design for all devices

### For Admins
- ➕ Create and manage events with rich details
- 📊 Advanced analytics dashboard with insights
- 🎯 Target events by department and year
- 📋 Manage event categories and participant lists
- 📈 View registration trends and popular events
- 👥 Export participant data and statistics
- 🔧 Comprehensive event management tools

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **Zod** for data validation
- **bcryptjs** for secure password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern styling
- **React Router** for client-side routing
- **Axios** for HTTP requests with interceptors
- **Lucide React** for beautiful icons
- **date-fns** for date formatting
- **Context API** for state management

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd eventhub
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file with the following variables:
   MONGODB_URI=mongodb://localhost:27017/eventhub
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_REFRESH_SECRET=your_refresh_secret_key_here
   PORT=5001
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   ✅ Backend will run on http://localhost:5001

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install date-fns  # Required for date formatting
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   ✅ Frontend will run on http://localhost:3000

### 🎯 Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001
- **MongoDB:** mongodb://localhost:27017/eventhub

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)
- `POST /api/events/:id/interest` - Show interest (Student only)
- `POST /api/events/:id/register` - Register for event (Student only)
- `DELETE /api/events/:id/register` - Cancel registration (Student only)
- `GET /api/events/my/registered` - Get user's registered events
- `GET /api/events/:id/participants` - Get event participants (Admin only)
- `POST /api/events/:id/feedback` - Submit event feedback
- `GET /api/events/:id/feedback` - Get event feedback

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload user avatar
- `GET /api/users/my-events` - Get user's events
- `GET /api/users/students` - Get all students (Admin only)

### Analytics (Admin only)
- `GET /api/analytics/dashboard` - Get comprehensive analytics
- `GET /api/analytics/events/:id` - Get specific event analytics

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `GET /api/notifications/unread-count` - Get unread notification count

## 📁 Project Structure

```
eventhub/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Global error handling
│   ├── models/
│   │   ├── User.js              # User schema with preferences
│   │   └── Event.js             # Event schema with feedback
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── events.js            # Event management routes
│   │   ├── users.js             # User profile routes
│   │   └── analytics.js         # Analytics routes
│   ├── utils/
│   │   └── validation.js        # Zod validation schemas
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server setup
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx           # Main layout with navigation
    │   │   ├── EventCard.tsx        # Enhanced event card
    │   │   ├── ProtectedRoute.tsx   # Route protection
    │   │   ├── Toast.tsx            # Toast notifications
    │   │   ├── NotificationDropdown.tsx
    │   │   └── EventFeedback.tsx    # Event rating system
    │   ├── context/
    │   │   ├── AuthContext.tsx      # Authentication state
    │   │   └── NotificationContext.tsx # Notification state
    │   ├── pages/
    │   │   ├── Landing.tsx          # Interactive landing page
    │   │   ├── Login.tsx            # User authentication
    │   │   ├── Register.tsx         # User registration
    │   │   ├── Events.tsx           # Event listing
    │   │   ├── EventDetails.tsx     # Detailed event view
    │   │   ├── Profile.tsx          # User profile management
    │   │   ├── Analytics.tsx        # Admin analytics dashboard
    │   │   ├── CreateEvent.tsx      # Event creation
    │   │   ├── EditEvent.tsx        # Event editing
    │   │   ├── MyEvents.tsx         # User's events
    │   │   └── AdminParticipants.tsx # Participant management
    │   ├── services/
    │   │   └── api.ts               # API service layer
    │   ├── types/
    │   │   └── index.ts             # TypeScript definitions
    │   ├── App.tsx                  # Main app component
    │   └── index.css                # Enhanced styles with animations
    ├── public/
    ├── package.json
    └── tailwind.config.js           # Tailwind configuration
```

## 🎯 Key Features Implementation

### 🔐 Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (Admin/Student)
- Protected routes and API endpoints
- Automatic token refresh on expiry
- Secure password hashing with bcrypt

### 📅 Event Management
- Complete CRUD operations for events
- Advanced event categorization and filtering
- Registration and interest tracking
- Department and year-based targeting
- Event status management (upcoming, ongoing, completed, cancelled)
- Rich event details with images and prerequisites

### 👤 User Experience
- Interactive landing page with animations
- Comprehensive user profiles with avatar upload
- Real-time notifications and toast messages
- Advanced search and filter functionality
- Responsive design optimized for all devices
- Modern UI with smooth animations and transitions

### 📊 Analytics & Insights
- Comprehensive admin dashboard
- Event registration trends and statistics
- Popular events tracking
- Department and category analytics
- Monthly registration patterns
- Exportable participant data

### ⭐ Enhanced Features
- Event feedback and rating system
- Real-time notification system
- User preference management
- Advanced event sharing capabilities
- Toast notifications for user feedback
- Smooth animations and micro-interactions

## 🎨 Design Features

- **Modern UI/UX:** Clean, intuitive interface with gradient backgrounds
- **Responsive Design:** Optimized for desktop, tablet, and mobile
- **Animations:** Smooth transitions and hover effects
- **Accessibility:** Proper contrast ratios and keyboard navigation
- **Performance:** Optimized loading states and efficient rendering

## 🔧 Development

### Default Accounts
For testing purposes, you can create accounts with these roles:
- **Admin:** Set role to 'admin' during registration
- **Student:** Set role to 'student' with department and year

### Environment Variables
Make sure to set strong, unique values for:
- `JWT_SECRET`: Used for signing access tokens
- `JWT_REFRESH_SECRET`: Used for signing refresh tokens
- `MONGODB_URI`: Your MongoDB connection string

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better campus event management
- Designed for scalability and maintainability

---

**EventHub** - Connecting students with campus events, one click at a time! 🎓✨