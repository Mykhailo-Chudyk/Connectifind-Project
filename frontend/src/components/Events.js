import React, { useEffect, useState } from 'react';
import eventservice from '../services/eventservice.js';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Events</h1>
      {error && <p>{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id} onClick={() => navigate(`${event.id}`)}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <small>Location: {event.location} on {new Date(event.time).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
