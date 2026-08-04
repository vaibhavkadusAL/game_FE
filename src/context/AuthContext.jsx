import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('yono_admin_token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('yono_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('yono_admin_token', token);
    } else {
      localStorage.removeItem('yono_admin_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('yono_admin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('yono_admin_user');
    }
  }, [user]);

  useEffect(() => {
    // Check if token exists and validate session on initial mount
    const savedToken = localStorage.getItem('yono_admin_token');
    const savedUser = localStorage.getItem('yono_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken, refreshToken) => {
    setUser(userData);
    setToken(userToken);
    if (refreshToken) {
      localStorage.setItem('yono_admin_refresh_token', refreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('yono_admin_token');
    localStorage.removeItem('yono_admin_refresh_token');
    localStorage.removeItem('yono_admin_user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
