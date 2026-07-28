import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function UserRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();

  // Redirect to login if user is not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Admin must NEVER see user study pages - redirect Admin exclusively to /admin
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
