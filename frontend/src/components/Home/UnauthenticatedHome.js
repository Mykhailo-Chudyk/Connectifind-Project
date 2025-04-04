import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EventWrapper from '../EventWrapper/EventWrapper';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import Skeleton from 'react-loading-skeleton';
import peopleVideo from '../../assets/people-video.mp4';
import './styles.scss';
import useDeviceType from '../../hooks/useDeviceType';

const UnauthenticatedHome = () => {
  /* 
  The UnauthenticatedHome component serves as the landing page for non-logged-in users.
  It displays a welcoming header with a tagline, a promotional video (on non-mobile devices),
  and a curated list of public events to entice user engagement.
  
  The component includes call-to-action buttons that direct users to login or events pages, 
  implementing a responsive design that adapts to different device types.
  
  It fetches public events data from Redux store and displays loading skeletons while content is loading.
  
  This component is integrated into the main routing system and shown when users visit the home page
  without authentication.
  */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useDeviceType();
  const { events: publicEvents, loading } = useSelector((state) => state.publicEvents);

  useEffect(() => {
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

  return (
    <div className='home-container unauthenticated'>
      <div className='home-header'>
        <div className='home-header-text'>
          <h2>Connecting people with shared interests</h2>
          <h3>Find -> Share -> Chat -> Meet -> Connect</h3>
        </div>
        {!isMobile ? <div className='home-video-container'>
          <video src={peopleVideo} autoPlay loop muted />
        </div> : null}
      </div>
      <div className='home-row space-top'>
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/login')}} width="300px"/>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="300px"/>
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {navigate('/login')}} width="300px"/>
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
      <div className='home-row redirect-button'>
        <ButtonComponent text="View all events" size="large" onClick={() => {navigate('/events')}} width="300px"/>
      </div>
      {false && <div className='home-row space-top video-container'>
        <h2>See How ConnectiFind Works</h2>
        <div className='video-container' style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/73wF2yYAB3A"
            title="ConnectiFind Platform Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>}
    </div>
  );
};

export default UnauthenticatedHome;