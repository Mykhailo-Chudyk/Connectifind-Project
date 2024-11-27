import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
    </div>
  );
};

export default Layout;