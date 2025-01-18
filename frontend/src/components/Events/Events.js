import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading, error } = useSelector((state) => state.publicEvents);

  useEffect(() => {
    // If we don't have any events, fetch them
    if (!events.length) {
      dispatch(fetchPublicEvents());
    }
    // Refresh events in background
    dispatch(fetchPublicEvents());
  }, [dispatch]);

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

  return (
    <div className='events-container'>
      <div className='events-header'>
        <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
        <h1>All events</h1>
      </div>
      {error && <p>{error}</p>}
      <div className='events-list'>
        {loading && !events.length ? (
          Array(9).fill().map((_, index) => (
            <EventSkeleton key={index} />
          ))
        ) : (
          events.map((event) => (
            <div key={event.id} onClick={() => navigate(`${event.id}`)} className='event-item'>
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
                <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`${event.id}`)}} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
