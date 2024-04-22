import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  function login(access_token) {
    setToken(access_token);
    if (token) {
      setIsAuthenticated(true);
    }
    localStorage.setItem('token', token);
  }

  function logout() {
    setToken(null);
    if (token === null) {
      setIsAuthenticated(false);
    }
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data;
        console.log(response);
        if (isAuthenticated) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    getUser();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ login, logout, token, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
