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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <div className="layout">
      </div>
    );
  }

  return (
    <div className="layout">
      <Header isAuthenticated={isAuthenticated} />
      <div className="layout-content">
        {isAuthenticated && user && <div 
          className='sidebar-container'
        >
          {(isAuthenticated && user) && <Sidebar onLogout={logout} />}
        </div>}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;