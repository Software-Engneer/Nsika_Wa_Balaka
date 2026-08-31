import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'kwathu_users';
const SESSION_KEY = 'kwathu_session';

function getUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUser(parsed);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signUp = ({ fullName, email, phone, password }) => {
    const users = getUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phone
    );
    if (exists) {
      return { success: false, error: 'An account with this email or phone already exists.' };
    }
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      fullName,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    const session = { id: newUser.id, fullName: newUser.fullName, email: newUser.email, phone: newUser.phone };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const signIn = ({ identifier, password }) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier.toLowerCase() || u.phone === identifier) &&
        u.password === password
    );
    if (!found) {
      return { success: false, error: 'Invalid email/phone or password.' };
    }
    const session = { id: found.id, fullName: found.fullName, email: found.email, phone: found.phone };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
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
