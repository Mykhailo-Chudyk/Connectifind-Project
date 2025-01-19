import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time to prevent flashing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <div style={{ display: 'flex' }}>
        <div 
          style={{ 
            opacity: isLoading ? 0 : 1
          }}
          className='sidebar-container'
        >
          {(isAuthenticated && user) && <Sidebar onLogout={logout} />}
        </div>
        <div 
          className='content-container'
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;