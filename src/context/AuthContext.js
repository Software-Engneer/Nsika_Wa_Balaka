import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'kwathu_token';
const USER_KEY = 'kwathu_user';

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getStoredUser() {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

function setStoredAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.auth.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Session expired:', error);
        clearStoredAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signUp = async (userData) => {
    try {
      const response = await api.auth.signup(userData);
      const { token, user } = response;
      setStoredAuth(token, user);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Sign up failed.',
      };
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await api.auth.signin(credentials);
      const { token, user } = response;
      setStoredAuth(token, user);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Sign in failed.',
      };
    }
  };

  const signOut = () => {
    clearStoredAuth();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const response = await api.auth.updateProfile(data);
    const updatedUser = response.user;
    const token = getStoredToken();
    setStoredAuth(token, updatedUser);
    setUser(updatedUser);
    return { success: true, user: updatedUser };
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
