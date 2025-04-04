import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import useDeviceType from '../../hooks/useDeviceType';
import { fetchPublicEvents } from '../../redux/actions/publicEventsActions';
import { fetchUserEvents } from '../../redux/actions/eventActions';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.scss';

const Events = ({ filter = "all" }) => {
  /* 
   Events component displays a list of events based on the provided filter.
   
   This component is integrated into the main application routing system and serves as both
   a public events discovery interface and a personal events management tool. It fetches 
   event data from Redux store and provides search functionality to filter events.
   
   Props:
   - filter (string): Determines which events to display.
     - "all": Shows all public events (default)
     - "created": Shows only events created by the current user
     - "joined": Shows only events the current user has joined
   
   Features:
   - Responsive layout that adapts to mobile devices
   - Search functionality for filtering events by title, description, or author
   - Loading state with skeleton UI
   - Navigation to individual event details
   */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const {isMobile} = useDeviceType();
  // Get search query from URL only on initial load
  useEffect(() => {
    if (!initialLoadDone) {
      const params = new URLSearchParams(location.search);
      const searchParam = params.get('search');
      if (searchParam) {
        setSearchQuery(searchParam);
      }
      setInitialLoadDone(true);
    }
  }, [location.search, initialLoadDone]);

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
    let events;
    switch (filter) {
      case "created":
        events = userEvents.filter(event => event.is_creator);
        break;
      case "joined":
        events = userEvents.filter(event => !event.is_creator);
        break;
      case "all":
      default:
        events = publicEvents;
    }

    if (!searchQuery) return events;

    const query = searchQuery.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      `${event.author.first_name} ${event.author.last_name}`.toLowerCase().includes(query)
    );
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
        <Skeleton width={100} height={30} className='event-time-location' />
      </div>
    </div>
  );

  const isLoading = filter === "all" ? publicLoading : userLoading;
  const filteredEvents = getFilteredEvents();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className={`events-container ${isMobile ? 'mobile' : ''}`}>
      <div className='events-header'>
        <span className='back-arrow' onClick={() => navigate(-1)}>←</span>
        <h1>{getPageTitle()}</h1>
      </div>
      <div className='events-search'>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className='events-search-input'
        />
      </div>
      {filteredEvents.length === 0 && !isLoading && (
        <p className="no-events-message">No events found.</p>
      )}
      <div className={`events-list ${isMobile ? 'mobile' : ''}`}>
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
                <p className='event-title'>{event.title}</p>
                <p className='event-author'>{event.author.first_name} {event.author.last_name}</p>
                <div 
                    className='event-description'
                    dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
              <div className='event-item-actions'>
                <p className='event-time-location'>{event.location}</p>
                <p className='event-time-location'>{new Date(event.time).toLocaleString()}</p>
                <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`/events/${event.id}`)}} width="50%"/>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
