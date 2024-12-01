import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  const userEvents = useSelector((state) => state.events.events);

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>Hello, {user?.first_name}!</h1>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {}} width="345px"/>
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {}} width="345px"/>
        <ButtonComponent text="Create Event" size="large" onClick={() => {}} width="345px"/>
      </div>
      <div className='home-row space-top'>
        <h1>Your Events</h1>
      </div>
      <div className='home-row vertical-scroll'>
        {userEvents.map((event) => (
          <EventWrapper key={event.id} event={event} />
        ))}
      </div>
      <div className='home-row space-top'>
        <h1>Explore public events nearby and join them</h1>
      </div>
      <div className='home-row'>
        Other Events will be displayed here...
      </div>

    </div>
  );
};

export default AuthenticatedHome;