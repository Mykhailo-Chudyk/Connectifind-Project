import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import InputField from '../InputField/InputField';
import { FaTimes } from 'react-icons/fa';
import { fetchUserEvents } from '../../redux/actions/eventActions';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import eventservice from '../../services/eventservice';
import useDeviceType from '../../hooks/useDeviceType';

const AuthenticatedHome = () => {
  const user = useSelector((state) => state.user.user);
  const { events: userEvents, loading: userEventsLoading } = useSelector((state) => state.events);
  const { events: publicEvents, loading: publicLoading } = useSelector((state) => state.publicEvents);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { isMobile } = useDeviceType();

  const createdEvents = userEvents.filter(event => event.is_creator);
  const joinedEvents = userEvents.filter(event => !event.is_creator);

  useEffect(() => {
    dispatch(fetchUserEvents());
    dispatch(fetchPublicEvents());
  }, [dispatch]);

  const EventSkeleton = () => (
    <div className="event-wrapper">
      <div className="event-icon">
        <Skeleton height={200} />
      </div>
      <div className="event-body">
        <div className="event-title">
          <Skeleton width={150} height={20} />
        </div>
        <div className="event-time">
          <Skeleton width={200} height={16} />
        </div>
        <div className="event-location">
          <Skeleton count={1} height={16} />
        </div>
      </div>
      {!isMobile && <div className="event-actions">
        <Skeleton width={180} height={20} />
      </div>}
    </div>
  );

  const handleCodeButtonClick = async () => {
    if (!showCodeInput) {
      setShowCodeInput(true);
    } else {
      try {
        const response = await eventservice.joinEventWithCode(eventCode);
        // Navigate to the event page after successful join
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

  const renderEventSection = (title, events, emptyMessage, emptyButtonText, emptyButtonAction, showAll = false, isLoading = false, seeAllPath = '/') => (
    <div className='home-section'>
      <div className='home-row space-top'>
        <h2>{title}</h2>
      </div>
      <div className='home-row vertical-scroll'>
        {isLoading ? (
          <>
            {Array(3).fill().map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </>
        ) : events.length === 0 ? (
          <div className='empty-events'>
            <p>{emptyMessage}</p>
            <ButtonComponent 
              text={emptyButtonText} 
              size="large" 
              onClick={emptyButtonAction} 
              width="345px"
            />
          </div>
        ) : (
          <>
            {events.slice(0, 3).map((event) => (
              <EventWrapper key={event.id} event={event} />
            ))}
            {events.length > 3 && showAll && (
              <ButtonComponent 
                text={`See all ${title.toLowerCase()}`} 
                size="large" 
                onClick={() => navigate(seeAllPath)} 
                width="345px"
              />
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className='home-container authenticated'>
      <div className='home-header'>
        <div className='home-header-text'>  
          <h1>Hello, {user?.first_name}!</h1>
          <h3>
            <ReactTyped
              strings={["Time to find your next event!", "Discover amazing events around you!", "Join the fun at local events!", "Explore new experiences!", "Find your next adventure!", "Connect with your community!"]}
              typeSpeed={50}
              backSpeed={25}
              backDelay={3000}
              loop
              cursorChar="|"
            />
          </h3>
        </div>
      </div>
      <div className='home-row space-top'>
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/add-event')}} width="300px"/>
        {isMobile && <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="300px"/>}
        <ButtonComponent 
          text={showCodeInput ? "Join" : "Enter Private Event Code"} 
          size="large" 
          onClick={handleCodeButtonClick} 
          width="300px"
        />
        {!isMobile && <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="300px"/>}
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

      {renderEventSection(
        "Public Events Nearby",
        publicEvents,
        "No public events available",
        "Find Events",
        () => navigate('/events'),
        true,
        publicLoading,
        '/events'
      )}

      {renderEventSection(
        "Events You Joined",
        joinedEvents,
        "You haven't joined any events yet",
        "Explore Events",
        () => navigate('/events'),
        true,
        userEventsLoading,
        '/joined-events'
      )}

      {renderEventSection(
        "Events you Created",
        createdEvents,
        "You haven't created any events yet",
        "Create Event",
        () => navigate('/add-event'),
        true,
        userEventsLoading,
        '/my-events'
      )}
    </div>
  );
};

export default AuthenticatedHome;