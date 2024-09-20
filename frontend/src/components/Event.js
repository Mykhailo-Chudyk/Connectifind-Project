import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventservice from '../services/eventservice.js';

const Event = () => {
  const { eventId } = useParams();  
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
      } catch (err) {
        console.error('Error retrieving event:', err);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);  

  return (
    <div>
      <h1>Event Details</h1>
      {eventDetails ? (
        <div>
          <h2>{eventDetails.title}</h2>
          <p>{eventDetails.description}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Time: {new Date(eventDetails.time).toLocaleString()}</p>
          <p>Capacity: {eventDetails.capacity || 'Not specified'}</p>
          <p>Visibility: {eventDetails.visibility}</p>
          <button onClick={() => console.log('Join event clicked')}>Join</button>
        </div>
      ) : (
        <p>No event details to display. Please check if the event ID is correct.</p>
      )}
    </div>
  );
};

export default Event;
