import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';
import eventservice from '../../services/eventservice';
import { useNavigate } from 'react-router-dom';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  const userEvents = useSelector((state) => state.events.events);
  const [publicEvents, setPublicEvents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // TODO: fetch only three events to display on the home page
    const fetchEvents = async () => {
      try {
        const data = await eventservice.listEvents();
        setPublicEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);


  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1>Hello, {user?.first_name}!</h1>
        <h3>Time to find your next event!</h3>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="345px"/>
        {/* TODO: add functionality */}
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {}} width="345px"/>
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/add-event')}} width="345px"/>
      </div>
      <div className='home-row space-top'>
        <h2>Your Events</h2>  
      </div>
      <div className='home-row vertical-scroll'>
        {userEvents.map((event) => (
          <EventWrapper key={event.id} event={event} />
        ))}
      </div>
      <div className='home-row space-top'>
        <h2>Explore public events nearby and join them</h2>
      </div>
      <div className='home-row vertical-scroll'>
        {publicEvents.map((event) => (
          <EventWrapper key={event.id} event={event} />
        ))}
      </div>
      <div className='home-row'>
        <ButtonComponent text="View all events" size="large" onClick={() => {navigate('/events')}} width="345px"/>
      </div>

    </div>
  );
};

export default AuthenticatedHome;