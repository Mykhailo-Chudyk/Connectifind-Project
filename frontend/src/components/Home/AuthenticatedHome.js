import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';
import eventservice from '../../services/eventservice';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import InputField from '../InputField/InputField';
import { FaTimes } from 'react-icons/fa';
import { joinEventSuccess } from '../../redux/actions/eventActions';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import Skeleton from 'react-loading-skeleton';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  const userEvents = useSelector((state) => state.events.events);
  const { events: publicEvents, loading } = useSelector((state) => state.publicEvents);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    // If we don't have any events, fetch them
    if (!publicEvents.length) {
      dispatch(fetchPublicEvents());
    }
    // Use requestIdleCallback to fetch events in background
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => dispatch(fetchPublicEvents()));
    } else {
      setTimeout(() => dispatch(fetchPublicEvents()), 100);
    }
  }, [dispatch]);

  const phrases = [
    'Time to find your next event!',
    'Discover amazing events around you!',
    'Join the fun at local events!',
    'Explore new experiences!',
    'Find your next adventure!',
    'Connect with your community!'
  ];

  const handleCodeButtonClick = async () => {
    if (!showCodeInput) {
      setShowCodeInput(true);
    } else {
      try {
        const response = await eventservice.joinEventWithCode(eventCode);
        const eventDetails = await eventservice.getEventById(response.event_id);
        dispatch(joinEventSuccess(eventDetails));
        navigate(`/events/${response.event_id}`);
      } catch (error) {
        console.error('Error joining event with code:', error);
        showToast(error?.error || 'Failed to join event with code', 'error');
      }
    }
  };

  const handleCloseInput = () => {
    setShowCodeInput(false);
    setEventCode('');
  };

  const EventSkeleton = () => (
    <div className="event-wrapper">
      <Skeleton height={200} />
      <div className="event-details">
        <Skeleton width={150} height={20} />
        <Skeleton width={200} height={16} />
        <Skeleton count={1} height={16} />
      </div>
    </div>
  );

  return (
    <div className='home-container'>
      <div className='home-header'>
        <div className='home-header-text'>  
          <h1>Hello, {user?.first_name}!</h1>
          <h3>
            <ReactTyped
              strings={phrases}
              typeSpeed={50}
              backSpeed={25}
              backDelay={3000}
              loop
              cursorChar="|"
            />
          </h3>
        </div>
      </div>
      <div className='home-row'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="345px"/>
        <ButtonComponent 
          text={showCodeInput ? "Join" : "Enter Private Event Code"} 
          size="large" 
          onClick={handleCodeButtonClick} 
          width="345px"
        />
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/add-event')}} width="345px"/>
      </div>
      {showCodeInput && (
        <div className='home-row code-input-row'>
          <div className="code-input-wrapper">
            <InputField
              // label="Event Code"
              type="text"
              value={eventCode}
              onChange={(e) => setEventCode(e.target.value)}
              placeholder="Enter 6-digit code"
            />
            <FaTimes className="code-input-close" onClick={handleCloseInput} />
          </div>
        </div>
      )}
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
        {loading && !publicEvents.length ? (
          Array(3).fill().map((_, index) => (
            <EventSkeleton key={index} />
          ))
        ) : (
          publicEvents.slice(0, 3).map((event) => (
            <EventWrapper key={event.id} event={event} />
          ))
        )}
      </div>
      <div className='home-row'>
        <ButtonComponent text="View all events" size="large" onClick={() => {navigate('/events')}} width="345px"/>
      </div>
    </div>
  );
};

export default AuthenticatedHome;