import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user: ", user);

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>Hello, {user?.first_name}!</h1>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {}} width="350px"/>
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {}} width="350px"/>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Create Event" size="large" onClick={() => {}} width="350px"/>
      </div>

    </div>
  );
};

export default AuthenticatedHome;