import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteStudent = () => {
  const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('userType') === 'student';

  return isAuthenticated ? <Outlet /> : <Navigate to="/studentlogin" />;
};

export default PrivateRouteStudent;
