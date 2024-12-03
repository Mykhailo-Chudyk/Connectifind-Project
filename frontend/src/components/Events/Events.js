import React, { useEffect, useState } from 'react';
import eventservice from '../../services/eventservice.js';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import './styles.scss'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventservice.listEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='events-container'>
      <h1>All Events</h1>
      {error && <p>{error}</p>}
      <div className='events-list'>
        {events.map((event) => (
          <div key={event.id} onClick={() => navigate(`${event.id}`)} className='event-item'>
            <div className='event-item-image'>
              {event?.image && <img src={event?.image} alt={event.title} />}
              {!event?.image && <FaCalendarAlt />}
            </div>
            <div className='event-item-body'>
              <p className='event-author'>{event.author.first_name} {event.author.last_name}</p>
              <p className='event-title'>{event.title}</p>
              <p className='event-description'>{event.description}</p>
              <p className='event-time-location'>{event.location}</p>
              <p className='event-time-location'>{new Date(event.time).toLocaleString()}</p>
            </div>
            <div className='event-item-actions'>
              <ButtonComponent text="Details" level="secondary" onClick={() => {navigate(`${event.id}`)}} />
            </div>
          </div>
        ))}
      </div>
      <div className='events-return-button'>
        <ButtonComponent text="Return" size="large" level="primary" onClick={() => {navigate(-1)}} width="300px"/>
      </div>
    </div>
  );
};

export default Events;
