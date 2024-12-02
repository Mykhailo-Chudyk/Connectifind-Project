import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = useSelector((state) => state.user.user);


  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <div style={{ display: 'flex' }}>
        {user && <Sidebar onLogout={logout} />}
        <div style={{ marginLeft: user ? '60px' : '0', marginTop: '60px', width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;