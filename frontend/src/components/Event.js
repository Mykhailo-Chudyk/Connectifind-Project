import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventservice from '../services/eventservice.js';

const Event = () => {
  const { eventId } = useParams();  
  const [eventDetails, setEventDetails] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
        setIsParticipant(details.is_participant);
      } catch (err) {
        console.error('Error retrieving event:', err);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);  

  const joinLeaveEvent = async () => {
    if (isParticipant) {
      const response = await eventservice.leaveEvent(eventId);
      if (response) {
        setIsParticipant(false);
        setEventDetails((details) => ({
          ...details,
          participant_count: details.participant_count - 1
        }));
      }
    } else {
      const response = await eventservice.joinEvent(eventId);
      if (response) {
        setIsParticipant(true);
        setEventDetails((details) => ({
          ...details,
          participant_count: details.participant_count + 1
        }));
      }
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
          <p>Number of participants: {eventDetails.participant_count}</p>
          <h3>Participants:</h3>
          {eventDetails.participants.map((participant) => <p>{participant.first_name} {participant.last_name}</p>)}
          {!eventDetails.is_creator ? <button onClick={joinLeaveEvent}>{isParticipant? "Leave" : "Join"}</button> : <p>This is your event</p>}
          {(eventDetails.is_creator || isParticipant) && <button>Go to Event</button>}
          
          
        </div>
      ) : (
        <p>No event details to display. Please check if the event ID is correct.</p>
      )}
    </div>
  );
};

export default Event;
