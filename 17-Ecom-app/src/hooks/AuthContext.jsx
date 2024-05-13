import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (access_token) => {
    setToken(access_token);
    localStorage.setItem('token', access_token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response?.data;
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    if (isAuthenticated) {
      getUser();
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    // Redirect to dashboard after login
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ login, logout, token, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
