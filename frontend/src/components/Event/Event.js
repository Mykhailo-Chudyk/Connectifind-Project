import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventservice from '../../services/eventservice.js';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import EventDetails from '../EventDetails/EventDetails.js';

const Event = () => {
  const { eventId } = useParams();  
  const [eventDetails, setEventDetails] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
        setIsParticipant(details.is_participant);
        setIsLoading(false);
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

  const goToEvent = () => {
    window.location.href = `/event/${eventId}/about`;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!eventDetails) {
    return <p>No event details to display. Please check if the event ID is correct.</p>;
  }

  return (
    <div className="event-container">
      <h2>{eventDetails.title}</h2>
      <EventDetails eventDetails={eventDetails}/>
      <div className="event-details-footer">
        <p className="event-details-spots">Spots left: {eventDetails.capacity - eventDetails.participant_count}</p>
        <div className="event-details-buttons">
          <ButtonComponent text={"Return"} onClick={() => window.history.back()} width='200px' level='primary'/>
          {!eventDetails.is_creator && <ButtonComponent text={isParticipant? "Leave" : "Join"} onClick={joinLeaveEvent} width='200px' />}
          {(eventDetails.is_creator && !isParticipant) && <ButtonComponent text={"Go to Event"} onClick={goToEvent} width='200px'/>}
        </div>
      </div>
    </div>
  );
};

export default Event;
