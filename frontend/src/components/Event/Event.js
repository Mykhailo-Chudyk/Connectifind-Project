import { useParams, useNavigate } from 'react-router-dom';
import eventservice from '../../services/eventservice.js';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import EventDetails from '../EventDetails/EventDetails.js';
import AlertModal from '../AlertModal/AlertModal.js';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { joinEventSuccess, leaveEventSuccess } from '../../redux/actions/eventActions';
import useDeviceType from '../../hooks/useDeviceType.js';

const Event = () => {
  /* 
   Event component displays detailed information about a specific event and provides functionality for user interaction.
   
   This component is integrated into the main routing system and is displayed when a user navigates to /event/:eventId.
   It fetches event details using the eventId from URL parameters and displays them using the EventDetails component.
   
   The component handles different user states:
   - Unauthenticated users see a "Login to Join" button
   - Event creators see a "Go to Event" button
   - Event participants see a "Leave Event" button
   - Non-participants see a "Join Event" button
   
   Inputs:
   - eventId: Retrieved from URL parameters using useParams
   - user: Retrieved from Redux store to determine authentication status
   - Toast context: Used for displaying success/error notifications
   - Redux dispatch: Used to update global state when joining/leaving events
   
   The component is responsive and adapts to mobile view using the useDeviceType hook.
  */
  const { eventId } = useParams();  
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const {isMobile} = useDeviceType();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const details = await eventservice.getEventById(eventId);
        setEventDetails(details);
        setIsParticipant(details.is_participant);
      } catch (err) {
        console.error('Error retrieving event:', err);
      } finally {
        setIsLoading(false);
      }

    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);  

  const handleJoinLeave = async () => {
    if (isParticipant) {
      setShowLeaveModal(true);
    } else {
      await joinEvent();
    }
  };

  const joinEvent = async () => {
    setIsProcessing(true);
    try {
      const response = await eventservice.joinEvent(eventId);
      if (response) {
        setIsParticipant(true);
        setEventDetails((details) => ({
          ...details,
          participant_count: details.participant_count + 1,
          is_participant: true
        }));
        dispatch(joinEventSuccess({
          ...eventDetails,
          is_participant: true
        }));
      }
    } catch (error) {
      console.error('Error joining event:', error);
      showToast('Failed to join event', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const leaveEvent = async () => {
    setIsProcessing(true);
    try {
      const response = await eventservice.leaveEvent(eventId);
      if (response) {
        setIsParticipant(false);
        setEventDetails((details) => ({
          ...details,
          participant_count: details.participant_count - 1,
          is_participant: false
        }));
        dispatch(leaveEventSuccess(eventId));
        setShowLeaveModal(false);
      }
    } catch (error) {
      console.error('Error leaving event:', error);
      showToast('Failed to leave event', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const goToEvent = () => {
    window.location.href = `/event/${eventId}/about`;
  }

  if (isLoading) {
    return <div></div>;
  }

  if (!eventDetails) {

    return <div className={`event-container ${isMobile ? 'mobile' : ''}`}>
      <h1>No event details to display. Please check if the event ID is correct.</h1>
    </div>;
  }

  return (
    <div className={`event-container ${isMobile ? 'mobile' : ''}`}>
      <div className='event-header'>
        <span className='back-arrow' onClick={() => window.history.back()}>←</span>
        <h1>{eventDetails.title}</h1>
      </div>
      <EventDetails eventDetails={eventDetails}/>
      <div className="event-details-footer">
        <p className="event-details-spots">Spots left: {eventDetails.capacity - eventDetails.participant_count} / {eventDetails.capacity}</p>
        <div className="event-details-buttons">
          {!user && <ButtonComponent text={"Login to Join"} onClick={() => navigate('/login')} width='200px' />}
          {user && !eventDetails.is_creator && 
            <ButtonComponent 
              text={isProcessing ? "Processing..." : (isParticipant ? "Leave Event" : "Join Event")}
              onClick={handleJoinLeave}
              isDangerous={isParticipant}
              disabled={isProcessing}
              width='200px'
            />
          }
          {user && (eventDetails.is_creator && !isParticipant) && 
            <ButtonComponent text={"Go to Event"} onClick={goToEvent} width='200px'/>
          }
        </div>
      </div>

      {showLeaveModal && (
        <AlertModal
          title="Leave Event"
          message="Are you sure you want to leave this event? You will lose all your event data including your goal and messages."
          onContinue={leaveEvent}
          onCancel={() => setShowLeaveModal(false)}
          continueText="Yes, Leave Event"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default Event;
