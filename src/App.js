import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import Categories from './components/pages/Categories';
import News from './components/pages/News';
import Sports from './components/pages/Sports';
import Events from './components/pages/Events';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontSize: '1.1rem', color: '#64748b' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/news" element={<News />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/events" element={<Events />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/messages" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<SignOut />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
