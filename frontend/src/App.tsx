import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import AdminParticipants from './pages/AdminParticipants';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import MyEvents from './pages/MyEvents';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/events" replace /> : <Landing />} 
      />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/events" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/events" replace /> : <Register />} 
      />
      
      <Route path="/events" element={
        <ProtectedRoute>
          <Layout>
            <Events />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/events/:id" element={
        <ProtectedRoute>
          <Layout>
            <EventDetails />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/create-event" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <CreateEvent />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/events/:id/edit" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <EditEvent />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/my-events" element={
        <ProtectedRoute>
          <Layout>
            <MyEvents />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/events/:id/participants" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminParticipants />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/analytics" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <Analytics />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toast />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;