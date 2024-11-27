import React from 'react';
import Header from './Header/Header';

const AuthenticatedHome = () => {
  return (
    <div>
      <Header isAuthenticated={true} />
      <h1>Welcome back!</h1>
      <p>Here is your personalized content.</p>
    </div>
  );
};

export default AuthenticatedHome;