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
      <Skeleton height={200} />
      <div className="event-details">
        <Skeleton width={150} height={20} />
        <Skeleton width={200} height={16} />
        <Skeleton count={1} height={16} />
      </div>
    </div>
  );

  return (
    <div className='home-container unauthenticated'>
      <div className='home-header'>
        <div className='home-header-text'>
          <h2>Building a bridge between event attendees</h2>
          <h3>Find the ones with shared interests</h3>
        </div>
        {!isMobile ? <div className='home-video-container'>
          <video src={peopleVideo} autoPlay loop muted />
        </div> : null}
      </div>
      <div className='home-row space-top'>
        <ButtonComponent text="Find Public Event" size="large" onClick={() => {navigate('/events')}} width="345px"/>
        <ButtonComponent text="Enter Private Event Code" size="large" onClick={() => {navigate('/login')}} width="345px"/>
        <ButtonComponent text="Create Event" size="large" onClick={() => {navigate('/login')}} width="345px"/>
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
      <div className='home-row space-top'>
        <h3> 
        At ConnectiFind, we transform the typical event experience by seamlessly bridging the gap between attendees. It’s common to feel hesitant about approaching someone new, but what if you could know their interests and goals beforehand? Our platform does just that, empowering you to connect with the right people right away. Whether you’re looking to collaborate, find a mentor, or share insights, ConnectiFind makes every interaction more intentional and productive. Join us to make your next event the most rewarding yet.
        </h3>
      </div>
      {/* TODO: it's not that important right now. Finish it later */}
      {/* <div className='home-row home-phrase-container'>
        <p className="home-phrase">⭐ Discover shared interests</p>
        <p className="home-phrase">💬 Connect with like-minded individuals</p>
        <p className="home-phrase">🚀 Make every interaction count</p>
        <p className="home-phrase">💡 Discover new ideas</p>
        <p className="home-phrase">💪 Build your network</p>
        <p className="home-phrase">🤝 Create opportunities</p>
        <p className="home-phrase">💰 Save time and money</p>
        <p className="home-phrase">🌟 Make lasting connections</p>
      </div> */}
    </div>
  );
};

export default UnauthenticatedHome;