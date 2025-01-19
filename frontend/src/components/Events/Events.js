import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import { fetchUserEvents } from '../../redux/actions/eventActions';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';

const Events = ({ filter = "all" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events: publicEvents, loading: publicLoading } = useSelector((state) => state.publicEvents);
  const { events: userEvents, loading: userLoading } = useSelector((state) => state.events);

  useEffect(() => {
    if (filter === "all") {
      dispatch(fetchPublicEvents());
    } else {
      dispatch(fetchUserEvents());
    }
  }, [dispatch, filter]);

  const getFilteredEvents = () => {
    switch (filter) {
      case "created":
        return userEvents.filter(event => event.is_creator);
      case "joined":
        return userEvents.filter(event => !event.is_creator);
      case "all":
      default:
        return publicEvents;
    }
  };

  const getPageTitle = () => {
    switch (filter) {
      case "created":
        return "Events You Created";
      case "joined":
        return "Events You Joined";
      case "all":
      default:
        return "All Events";
    }
  };

  const EventSkeleton = () => (
    <div className='event-item'>
      <div className='event-item-image'>
        <Skeleton height={200} />
      </div>
      <div className='event-item-body'>
        <Skeleton width={150} height={20} className='event-author' />
        <Skeleton width={200} height={16} className='event-title' />
        <Skeleton count={1} height={16} className='event-description' />
      </div>
      <div className='event-item-actions'>
        <Skeleton width={180} height={20} className='event-time-location' />
      </div>
    </div>
  );

  const isLoading = filter === "all" ? publicLoading : userLoading;
  const filteredEvents = getFilteredEvents();

  return (
    <div className='events-container'>
      <div className='events-header'>
        <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
        <h1>{getPageTitle()}</h1>
      </div>
      {filteredEvents.length === 0 && !isLoading && (
        <p className="no-events-message">No events found.</p>
      )}
      <div className='events-list'>
        {isLoading ? (
          Array(9).fill().map((_, index) => (
            <EventSkeleton key={index} />
          ))
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} onClick={() => navigate(`/events/${event.id}`)} className='event-item'>
              <div className='event-item-image'>
                {event?.image && <img src={event?.image} alt={event.title} />}
                {!event?.image && <FaCalendarAlt />}
              </div>
              <div className='event-item-body'>
                <p className='event-author'>{event.author.first_name} {event.author.last_name}</p>
                <p className='event-title'>{event.title}</p>
                <p className='event-description'>{event.description}</p>
              </div>
              <div className='event-item-actions'>
                <p className='event-time-location'>{event.location}</p>
                <p className='event-time-location'>{new Date(event.time).toLocaleString()}</p>
                <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`/events/${event.id}`)}} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
