import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAPI } from '../services/mockAPI';

// Create Auth Context
export const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lernbase_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('lernbase_token'));
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await mockAPI.login(credentials);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('lernbase_user', JSON.stringify(response.user));
        localStorage.setItem('lernbase_token', response.token);
        return response;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await mockAPI.register(userData);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('lernbase_user', JSON.stringify(response.user));
        localStorage.setItem('lernbase_token', response.token);
        return response;
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lernbase_user');
    localStorage.removeItem('lernbase_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
