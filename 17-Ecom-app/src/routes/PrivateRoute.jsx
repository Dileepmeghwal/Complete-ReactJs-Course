import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/AuthContext';
import { LoginPage, Page404 } from './sections';


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : <LoginPage/>;
};

export default PrivateRoute;
