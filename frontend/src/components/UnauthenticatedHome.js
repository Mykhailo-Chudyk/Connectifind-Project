import React from 'react';
import Header from './Header/Header';

const UnauthenticatedHome = () => {
  return (
    <div>
      <Header isAuthenticated={false} />
      <h1>Welcome to our site!</h1>
      <p>Please log in or sign up to see more.</p>
    </div>
  );
};

export default UnauthenticatedHome;