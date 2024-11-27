import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar onLogout={logout} />}
        <div style={{ marginLeft: isAuthenticated ? '60px' : '0', marginTop: '60px', width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;