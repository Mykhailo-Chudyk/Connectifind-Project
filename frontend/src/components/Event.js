import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventservice from '../services/eventservice.js';

const Event = () => {
  const { eventId } = useParams();  
  const [eventDetails, setEventDetails] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

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

  const joinEvent = async () => {
    const response = await eventservice.joinEvent(eventId);
    if (response) {
      setIsJoined(true);
    }
  };

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
          <p>Author: {eventDetails.author.first_name + " " + eventDetails.author.last_name}</p>
          <p>Visibility: {eventDetails.visibility}</p>
          {!eventDetails.is_creator ? <button onClick={joinEvent}>{isJoined? "Joined" : "Join"}</button> : <p>This is your event</p>}
        </div>
      ) : (
        <p>No event details to display. Please check if the event ID is correct.</p>
      )}
    </div>
  );
};

export default Event;
