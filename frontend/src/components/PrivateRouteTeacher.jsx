import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteTeacher = () => {
  const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('userType') === 'teacher';

  return isAuthenticated ? <Outlet /> : <Navigate to="/adminlogin" />;
};

export default PrivateRouteTeacher;
