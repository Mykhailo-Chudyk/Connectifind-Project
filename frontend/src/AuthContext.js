import React, { createContext, useState, useEffect } from 'react';
import usersService from './services/userservice';
import { setUser, clearUser } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux'; 


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
      usersService.getUserInfo().then(user => {
        dispatch(setUser(user));
      }).catch(error => {
        logout();
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
    usersService.getUserInfo().then(user => {
      dispatch(setUser(user));
    }).catch(error => {
      logout();
      console.error('Error fetching user info:', error);
    });
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    dispatch(clearUser());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};