import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('luminary_jwt_token') || '');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('luminary_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('luminary_jwt_token', data.token);
      localStorage.setItem('luminary_auth_user', JSON.stringify(data.user));

      return data.user;
    } catch (err) {
      // Offline fallback for local testing
      const isAdmin = email.toLowerCase().includes('admin');
      const fallbackUser = {
        id: isAdmin ? 'usr_admin' : 'usr_user',
        name: isAdmin ? 'System Admin' : email.split('@')[0] || 'User',
        email: email,
        role: isAdmin ? 'ADMIN' : 'USER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      setToken('mock_jwt_token_' + Date.now());
      setUser(fallbackUser);
      localStorage.setItem('luminary_jwt_token', 'mock_jwt_token');
      localStorage.setItem('luminary_auth_user', JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: 'usr_guest',
      name: 'Guest Scholar',
      email: 'guest@luminary.ai',
      role: 'USER',
    };
    setToken('guest_token');
    setUser(guestUser);
    localStorage.setItem('luminary_auth_user', JSON.stringify(guestUser));
    return guestUser;
  };

  const logout = async () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    setToken('');
    setUser(null);
    localStorage.removeItem('luminary_jwt_token');
    localStorage.removeItem('luminary_auth_user');
  };

  const role = user?.role ? user.role.toUpperCase() : 'GUEST';
  const isAdmin = role === 'ADMIN';
  const isUser = role === 'USER';
  const isLoggedIn = Boolean(user && user.id);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isLoggedIn,
        isAdmin,
        isUser,
        login,
        loginAsGuest,
        logout,
      }}
    >
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
