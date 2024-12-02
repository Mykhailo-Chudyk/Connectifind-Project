import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user: ", user);

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>Hello, {user?.first_name}!</h1>
      </div>
      
      <p>Here is your personalized content.</p>
    </div>
  );
};

export default AuthenticatedHome;